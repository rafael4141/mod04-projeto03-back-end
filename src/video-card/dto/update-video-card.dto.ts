import { IsOptional, IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateVideoCardDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsUrl()
  @IsOptional()
  photoURL: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  vram: number;

  @IsString()
  @IsOptional()
  memory_type: string;

  @IsNumber()
  @IsOptional()
  release_year: number;
}
