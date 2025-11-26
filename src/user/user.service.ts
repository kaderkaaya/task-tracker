import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from "@prisma/client";
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }
  async create(email: string, password: string, name: string): Promise<object> {
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.databaseService.user.create({
      data: {
        email,
        password: hash,
        name
      }
    });
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id }
    });
  }

  async getUser(email: string) {
    return this.databaseService.user.findUnique({
      where: { email }
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
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

}
