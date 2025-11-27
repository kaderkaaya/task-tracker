import { IsNotEmpty, IsOptional } from "class-validator";
export class UpdateTaskDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    taskId: number;
    @IsOptional()
    title: string;
    @IsOptional()
    description: string;
    @IsOptional()
    dueDate: Date;
    // @IsOptional()
    // tags: string[];
}
