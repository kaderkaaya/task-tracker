import { Injectable, ParseDatePipe } from '@nestjs/common';
import { Prisma, TaskStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { AddTagsDto } from './dto/add-tags-dto';
import { GetTasksDto } from './dto/get-tasks-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { CompleteTaskDto } from './dto/complete-task-dto';
import { UpdateTaskstatusDto } from './dto/update-task-status-dto';
import { AddFavoriteDto } from './dto/add-favorite-dto';
import { AddPrivateDto } from './dto/add-private-dto';
import { AddPriorityDto } from './dto/add-priority-dto';
import { UserService } from 'src/user/user.service';
import { AppErrors } from 'src/common/errors/err';
import ApiError from 'src/common/errors/api-error';
@Injectable()
export class TaskService {
    constructor(
        private readonly databaseService: DatabaseService,
        private usersService: UserService,

    ) { }

    async createTask(createTaskDto: CreateTaskDto) {
        const id: number = createTaskDto.userId
        const user = await this.usersService.getUserById(Number(id));
        if (!user) {
            throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode)
        }
        const now = new Date();
        const date = new Date(createTaskDto.dueDate);
        if (date < now) {
            throw new ApiError(AppErrors.DATE_ERROR.message, AppErrors.DATE_ERROR.statusCode)

        }
        const task = await this.databaseService.task.create({
            data: createTaskDto
        })
        return task;
    }

    async addTags(addTagsDto: AddTagsDto) {
        const id: number = addTagsDto.userId
        const user = await this.usersService.getUserById(Number(id));
        if (!user) {
            throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode)
        }
        const task = await this.getUserTask(addTagsDto.taskId);
        if (!task) {
            throw new ApiError(AppErrors.TASK_ERROR.message, AppErrors.TASK_ERROR.statusCode)
        }
        return await this.databaseService.task.update({
            where: { id: addTagsDto.taskId },
            data: {
                tags: {
                    create: addTagsDto.tags.map(name => ({ name }))
                }
            }
        })
    }

    async getUserTasks(getTaskDto: GetTasksDto) {
        const id: number = getTaskDto.userId
        const user = await this.usersService.getUserById(Number(id));

        if (!user) {
            throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode)
        }
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
        const id: number = updateTaskDto.userId
        const user = await this.usersService.getUserById(Number(id));
        if (!user) {
            throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode)
        }
        const task = await this.getUserTask(updateTaskDto.taskId);
        if (!task) {
            throw new ApiError(AppErrors.TASK_ERROR.message, AppErrors.TASK_ERROR.statusCode)
        }
        const now = new Date();
        const date = new Date(updateTaskDto.dueDate);
        if (date < now) {
            throw new ApiError(AppErrors.DATE_ERROR.message, AppErrors.DATE_ERROR.statusCode)

        }
        return await this.databaseService.task.update({
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
        const id: number = completeTaskDto.userId
        const user = await this.usersService.getUserById(Number(id));
        if (!user) {
            throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode)
        }
        const task = await this.getUserTask(completeTaskDto.taskId);
        if (!task) {
            throw new ApiError(AppErrors.TASK_ERROR.message, AppErrors.TASK_ERROR.statusCode)
        }
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
        const id: number = updateTaskstatusDto.userId
        const user = await this.usersService.getUserById(Number(id));
        if (!user) {
            throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode)
        }
        const task = await this.getUserTask(updateTaskstatusDto.taskId);
        if (!task) {
            throw new ApiError(AppErrors.TASK_ERROR.message, AppErrors.TASK_ERROR.statusCode)
        }
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

    async addFavorite(addFavoriteDto: AddFavoriteDto) {
        const id: number = addFavoriteDto.userId
        const user = await this.usersService.getUserById(Number(id));
        if (!user) {
            throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode)
        }
        const task = await this.getUserTask(addFavoriteDto.taskId);
        if (!task) {
            throw new ApiError(AppErrors.TASK_ERROR.message, AppErrors.TASK_ERROR.statusCode)
        }
        return await this.databaseService.task.update({
            where: {
                id: addFavoriteDto.taskId,
                userId: addFavoriteDto.userId
            },
            data: {
                isFavorite: Boolean(addFavoriteDto.isFavorite),
            }
        })
    }

    async addPrivate(addPrivateDto: AddPrivateDto) {
        return await this.databaseService.task.update({
            where: {
                id: addPrivateDto.taskId,
                userId: addPrivateDto.userId
            },
            data: {
                isPrivate: Boolean(addPrivateDto.isPrivate),
            }
        })
    }

    async addPriorityToTask(addPriorityDto: AddPriorityDto) {
        return await this.databaseService.task.update({
            where: {
                id: addPriorityDto.taskId,
                userId: addPriorityDto.userId
            },
            data: {
                priority: addPriorityDto.priority,
            }
        })
    }

}
