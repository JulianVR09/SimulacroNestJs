import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductCardDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsMongoId()
    @IsOptional()
    products?: string[];
}
