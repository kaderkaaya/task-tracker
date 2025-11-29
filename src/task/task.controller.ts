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
import { AddFavoriteDto } from './dto/add-favorite-dto';
import { AddPrivateDto } from './dto/add-private-dto';
import { AddPriorityDto } from './dto/add-priority-dto';
@Controller('task')
export class TaskController {
    constructor(private readonly taskServices: TaskService,
    ) { }

    @Post('create-task')
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<any> {
        try {
            const task = await this.taskServices.createTask(createTaskDto);
            return { task };
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
        return await this.taskServices.getUserTasks(getTaskDto);
    }

    @Post('update-task')
    async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<any> {
        const task = await this.taskServices.updateTask(updateTaskDto);
        return { task };
    }

    @Post('update-task-status')
    async updateTaskStatus(@Body() updateTaskstatusDto: UpdateTaskstatusDto): Promise<any> {
        const task = await this.taskServices.updateTaskStatus(updateTaskstatusDto);
        return { task };
    }

    @Post('complete-task')
    async completeTask(@Body() completeTaskDto: CompleteTaskDto): Promise<any> {
        const task = await this.taskServices.completeTask(completeTaskDto);
        return { task };
    }

    @Post('add-favorite')
    async addFavorite(@Body() addFavoriteDto: AddFavoriteDto): Promise<any> {
        const task = await this.taskServices.addFavorite(addFavoriteDto);
        return { task };
    }

    @Post('is-private')
    async addPrivate(@Body() addPrivateDto: AddPrivateDto): Promise<any> {
        const task = await this.taskServices.addPrivate(addPrivateDto);
        return { task };
    }

    @Post('add-priority-task')
    async addPriorityToTask(@Body() addPriorityDto: AddPriorityDto): Promise<any> {
        const task = await this.taskServices.addPriorityToTask(addPriorityDto);
        return { task };
    }
}
