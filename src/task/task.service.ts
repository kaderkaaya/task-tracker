import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class TaskService {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }
    async createTask(userId: number, title: string, description: string, dueDate: Date) { }
    async addTags(taskId: number, tags: [string]) { }
    async getTasks(userId: number) { }
    async updateTaskStatus(taskId: number, taskStatus: string) { }
    async completeTask(taskId: number, completedAt: Date) { }
    async updateTask(id: number, data: Prisma.TaskUpdateInput) { }
}
