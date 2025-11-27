import { IsNotEmpty } from "class-validator";
export class AddTagsDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    tags: string[];
    @IsNotEmpty()
    taskId: number;

}