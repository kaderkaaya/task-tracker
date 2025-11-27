import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class GetUserByIdDto {
    @IsNotEmpty()
    userId: number;
}
