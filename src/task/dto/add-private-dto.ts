import { IsNotEmpty, IsOptional } from "class-validator";
export class AddPrivateDto {
    @IsNotEmpty()
    userId: number;
     @IsOptional()
    isPrivate: Boolean;
     @IsNotEmpty()
    taskId: number;

}