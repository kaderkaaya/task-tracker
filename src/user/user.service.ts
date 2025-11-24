import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, Prisma } from "@prisma/client";
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
   constructor(private readonly databaseService: DatabaseService) { }
 async create(createUserDto: Prisma.UserCreateInput) {
  return this.databaseService.user.create({
    data:createUserDto
  });
}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
