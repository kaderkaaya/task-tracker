import { Prisma } from '@prisma/client';
import { TaskService } from './task.service';
import { Controller, Get, Post, Body, Query, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { AddTagsDto } from './dto/add-tags-dto';
import { Task } from '@prisma/client';
import { GetTasksDto } from './dto/get-tasks-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { CompleteTaskDto } from './dto/complete-task-dto';
import { UpdateTaskstatusDto } from './dto/update-task-status-dto';
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

    @Post('add-tags')
    async addTags(@Body() addTagsDto: AddTagsDto): Promise<Task> {
        return await this.taskServices.addTags(addTagsDto);
    }

    @Get('get-tasks')
    async getUserTasks(@Query() getTaskDto: GetTasksDto): Promise<any> {
        return this.taskServices.getUserTasks(getTaskDto);
    }

    @Post('update-task')
    async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskServices.updateTask(updateTaskDto);
    }

    @Post('update-task-status')
    async updateTaskStatus(@Body() updateTaskstatusDto: UpdateTaskstatusDto): Promise<Task> {
        return this.taskServices.updateTaskStatus(updateTaskstatusDto);
    }

    @Post('complete-task')
    async completeTask(@Body() completeTaskDto: CompleteTaskDto): Promise<Task> {
        return this.taskServices.completeTask(completeTaskDto);
    }
}
