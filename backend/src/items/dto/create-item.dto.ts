import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
