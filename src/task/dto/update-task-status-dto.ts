import { TaskStatus } from "@prisma/client";
import { IsNotEmpty, IsOptional } from "class-validator";
export class UpdateTaskstatusDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    taskId: number;
    @IsOptional()
    taskStatus: TaskStatus;

}