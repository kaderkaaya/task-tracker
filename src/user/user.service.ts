import { Injectable } from '@nestjs/common';
import { Prisma } from "@prisma/client";
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id-dto';
import ApiError from 'src/common/errors/api-error';
import { AppErrors } from 'src/common/errors/err';
const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.getUser(createUserDto.email);
    if (user) {
      throw new ApiError(AppErrors.EXISTING_USER.message, AppErrors.EXISTING_USER.statusCode)
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
  
  async getUsers(){
    const users = await this.databaseService.user.findMany({});
    console.log('users',users);
    

  }

}
