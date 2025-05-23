import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotaDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
