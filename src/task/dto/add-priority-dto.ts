import { Priority } from "@prisma/client";
import { IsNotEmpty, IsOptional } from "class-validator";
export class AddPriorityDto {
    @IsNotEmpty()
    userId: number;
     @IsOptional()
    priority: Priority;
     @IsNotEmpty()
    taskId: number;

}