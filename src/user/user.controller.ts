import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('sign-in')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = this.userService.create(createUserDto);
      return user;
    } catch (error) {

    }
  }

  @Get('getUserById')
  async findOne(@Query() getUserByIdDto: GetUserByIdDto) {
    return this.userService.findOne(getUserByIdDto);
  }

  @Post('update')
  async update(@Body() body: { id: number, data: Prisma.UserUpdateInput }) {
    return this.userService.update(body.id, body.data);
  }

}
