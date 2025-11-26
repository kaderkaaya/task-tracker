import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('sign-in')
  async create(@Body() body: { email: string, password: string, name: string }) {
    return this.userService.create(body.email, body.password, body.name);
  }

  // @Post('login')
  // async login(@Body() body: { email: string, password: string }) {
  //   return this.userService.login(body.email, body.password);
  // }

  @Get('getUserById')
  async findOne(@Query('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Post('update')
  async update(@Body() body: { id: number, data: Prisma.UserUpdateInput }) {
    return this.userService.update(body.id, body.data);
  }

}
