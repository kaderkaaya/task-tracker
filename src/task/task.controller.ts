import { Prisma } from '@prisma/client';
import { TaskService } from './task.service';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
@Controller('task')
export class TaskController {
    constructor(private readonly taskServices: TaskService) { }
    @Post('create-task')
    async createTask(@Body() body: { userId: number, title: string, description: string, dueDate: Date }) {
        return this.taskServices.createTask(body.userId, body.title, body.description, body.dueDate);
    }

    @Post('add-tags')
    async addTags(@Body() body: { taskId: number, tags: [string] }) {
        return this.taskServices.addTags(body.taskId, body.tags);
    }

    @Get('get-tasks')
    async getTasks(@Query('userId') userId: number) {
        return this.taskServices.getTasks(userId);
    }

    @Post('update-task')
    async updateTask(@Body() body: { id: number, data: Prisma.TaskUpdateInput }) {
        return this.taskServices.updateTask(body.id, body.data);
    }

    @Post('update-task-status')
    async updateTaskStatus(@Body() body: { taskId: number, taskStatus: string }) {
        return this.taskServices.updateTaskStatus(body.taskId, body.taskStatus);
    }
    @Post('complete-task')
    async completeTask(@Body() body: { taskId: number, completedAt: Date }) {
        return this.taskServices.completeTask(body.taskId, body.completedAt);
    }
}
