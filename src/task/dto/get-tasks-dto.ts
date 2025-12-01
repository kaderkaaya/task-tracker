import { IsNotEmpty, IsOptional } from "class-validator";
export class GetTasksDto {
    @IsNotEmpty()
    userId: number;
    @IsOptional()
    taskId: number;
    @IsOptional()
    page: number;
    @IsOptional()
    limit: number;
    @IsOptional()
    search: string;
}