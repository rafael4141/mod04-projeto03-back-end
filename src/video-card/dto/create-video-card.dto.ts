import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateVideoCardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsUrl()
  @IsNotEmpty()
  photoURL: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  vram: number;

  @IsString()
  @IsNotEmpty()
  memory_type: string;

  @IsNumber()
  @IsNotEmpty()
  release_year: number;
}
