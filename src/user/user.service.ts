import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from "@prisma/client";
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }
  async create(email: string, password: string, name: string) {
    const hash = await bcrypt.hash(password, saltOrRounds);
    console.log('hash', hash);
    return this.databaseService.user.create({
      data: {
        email,
        password: hash,
        name
      }
    });
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.getUser(email);
    const hash = user!.password
    const isMatch = await bcrypt.compare(password, hash);
    if (!user) {
      throw new Error('user not found')
    }
    if (!isMatch) {
      throw new UnauthorizedException();
    }

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

}
