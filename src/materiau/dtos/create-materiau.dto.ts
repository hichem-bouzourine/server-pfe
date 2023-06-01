import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMateriauDto {
  @IsString()
  @IsNotEmpty()
  nom: string;
}
