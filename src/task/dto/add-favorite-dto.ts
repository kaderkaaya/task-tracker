import { IsNotEmpty, IsOptional } from "class-validator";
export class AddFavoriteDto {
    @IsNotEmpty()
    userId: number;
    @IsOptional()
    isFavorite: Boolean;
    @IsNotEmpty()
    taskId: number;

}