import { Injectable } from '@nestjs/common';
import { Prisma, TaskStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { AddTagsDto } from './dto/add-tags-dto';
import { GetTasksDto } from './dto/get-tasks-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { CompleteTaskDto } from './dto/complete-task-dto';
import { UpdateTaskstatusDto } from './dto/update-task-status-dto';
@Injectable()
export class TaskService {
    constructor(
        private readonly databaseService: DatabaseService,

    ) { }

    async createTask(createTaskDto: CreateTaskDto) {
        return this.databaseService.task.create({
            data: createTaskDto
        })
    }

    async addTags(addTagsDto: AddTagsDto) {
        return this.databaseService.task.update({
            where: { id: addTagsDto.taskId },
            data: {
                tags: {
                    create: addTagsDto.tags.map(name => ({ name }))
                }
            }
        })
    }

    async getUserTasks(getTaskDto: GetTasksDto) {
        const taskId = Number(getTaskDto.taskId)
        if (getTaskDto.taskId) {
            const task = await this.getUserTask(taskId)
            return { task };
        }
        const tasks = await this.databaseService.task.findMany({
            where: { userId: Number(getTaskDto.userId) }
        })
        return { tasks };
    }

    async getUserTask(taskId: number) {
        return this.databaseService.task.findUnique({
            where: { id: taskId }
        })
    }

    async updateTask(updateTaskDto: UpdateTaskDto) {
        return this.databaseService.task.update({
            where: {
                id: updateTaskDto.taskId,
                userId: updateTaskDto.userId
            },
            data: {
                title: updateTaskDto.title,
                description: updateTaskDto.description,
                dueDate: updateTaskDto.dueDate,
            }
        })
    }

    async completeTask(completeTaskDto: CompleteTaskDto) {
        return this.databaseService.task.update({
            where: {
                id: completeTaskDto.taskId,
                userId: completeTaskDto.userId
            },
            data: {
                completedAt: completeTaskDto.completedAt,
                taskStatus: TaskStatus.DONE,
            }
        })
    }

    async updateTaskStatus(updateTaskstatusDto: UpdateTaskstatusDto) {
        return this.databaseService.task.update({
            where: {
                id: updateTaskstatusDto.taskId,
                userId: updateTaskstatusDto.userId
            },
            data: {
                taskStatus: updateTaskstatusDto.taskStatus,
            }
        })
    }
}
