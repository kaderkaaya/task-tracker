import { Prisma } from '@prisma/client';
import { TaskService } from './task.service';
import { Controller, Get, Post, Body, Query, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from '@prisma/client';
@Controller('task')
export class TaskController {
    constructor(private readonly taskServices: TaskService,
    ) { }
    @Post('create-task')
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            return await this.taskServices.createTask(createTaskDto);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Failed to create task');
        }
    }

    // @Post('add-tags')
    // async addTags(@Body() body: { taskId: number, tags: [string] }) {
    //     return this.taskServices.addTags(body.taskId, body.tags);
    // }

    // @Get('get-tasks')
    // async getTasks(@Query('userId') userId: number) {
    //     return this.taskServices.getTasks(userId);
    // }

    // @Post('update-task')
    // async updateTask(@Body() body: { id: number, data: Prisma.TaskUpdateInput }) {
    //     return this.taskServices.updateTask(body.id, body.data);
    // }

    // @Post('update-task-status')
    // async updateTaskStatus(@Body() body: { taskId: number, taskStatus: string }) {
    //     return this.taskServices.updateTaskStatus(body.taskId, body.taskStatus);
    // }
    // @Post('complete-task')
    // async completeTask(@Body() body: { taskId: number, completedAt: Date }) {
    //     return this.taskServices.completeTask(body.taskId, body.completedAt);
    // }
}
