import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReponseDto {
  @IsNotEmpty()
  @IsNumber()
  id_avis: number;

  @IsNotEmpty()
  @IsString()
  contenu: string;
}
