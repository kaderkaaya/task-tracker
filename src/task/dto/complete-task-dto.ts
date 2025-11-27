import { IsNotEmpty, IsOptional } from "class-validator";
export class CompleteTaskDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    taskId: number;
    @IsOptional()
    completedAt: Date;

}