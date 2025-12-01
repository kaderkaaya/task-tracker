import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Prisma } from "@prisma/client";
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id-dto';
import ApiError from 'src/common/errors/api-error';
import { AppErrors } from 'src/common/errors/err';
import { TaskService } from 'src/task/task.service';
import { Cron } from '@nestjs/schedule';
const saltOrRounds = 10;
const SEND_EMAIL = process.env.SEND_EMAIL;
const SEND_PASSWORD = process.env.SEND_PASSWORD;
import * as nodemailer from 'nodemailer';
import mailOptions from '../common/mail/mail';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
    const user = await this.getUser(createUserDto.email);
    if (user) {
      throw new ApiError(AppErrors.EXISTING_USER.message, AppErrors.EXISTING_USER.statusCode)
    }
    const validatePassword = passwordRegex.test(createUserDto.password);

    if (!validatePassword) {
      throw new ApiError(AppErrors.PASSWORD_ERROR.message, AppErrors.PASSWORD_ERROR.statusCode);
    }
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.databaseService.user.create({
      data: {
        email: createUserDto.email,
        password: hash,
        name: createUserDto.name
      }
    });
  }

  async findOne(getUserByIdDto: GetUserByIdDto) {
    return this.databaseService.user.findUnique({
      where: { id: Number(getUserByIdDto.userId) }
    });
  }

  async getUser(email: string) {
    return this.databaseService.user.findUnique({
      where: { email }
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode)
    }
    return this.databaseService.user.update({
      where: { id },
      data
    })
  }

  async registerToken(userId: number, token: string): Promise<any> {
    return this.databaseService.user.update({
      where: { id: userId },
      data: { token },
    })
  }

  async getUserById(id: number) {
    return this.databaseService.user.findUnique({
      where: { id }
    })
  }
  @Cron('45 * * * * *')
  async getUsers() {
    const users = await this.databaseService.user.findMany({});
    await Promise.all(users.map(async user => {
      const tasks = await this.taskService.getUserTasksForNotification(user.id);
      const now = new Date();
      const upcomingTasks = tasks.filter(task => {

        const due = new Date(task.dueDate);
        const diff = due.getTime() - now.getTime();
        const diffMinutes = diff / (1000 * 60);
        return diffMinutes > 0 && diffMinutes < 1000000000000000
      });

      const notif = upcomingTasks.map(async upcomingTask => {
        await this.sendNotification({ upcomingTask, user });
        await this.taskService.updateTaskNotification(upcomingTask.id);
      })
      return notif;
    }))
    return {
      success: true
    }
  }


  async sendNotification({ upcomingTask, user }) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SEND_EMAIL,
        pass: SEND_PASSWORD,
      },
    });
    await transporter.sendMail(mailOptions(user.email, upcomingTask.title));

  }

}
