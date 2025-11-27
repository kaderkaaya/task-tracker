import { IsNotEmpty } from "class-validator";
export class CreateTaskDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    dueDate: Date;

}