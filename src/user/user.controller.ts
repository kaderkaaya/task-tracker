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
    const user = await this.userService.create(createUserDto);
    return { user };
  }

  @Get('getUserById')
  async findOne(@Query() getUserByIdDto: GetUserByIdDto) {
    const user = await this.userService.findOne(getUserByIdDto);
    return { user };
  }

  @Post('update')
  async update(@Body() body: { id: number, data: Prisma.UserUpdateInput }) {
    const user = await this.userService.update(body.id, body.data);
    return { user };
  }

}
