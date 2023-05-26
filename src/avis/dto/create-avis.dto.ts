import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAvisDto {
  @IsNotEmpty()
  @IsNumber()
  id_utilisateur: number;

  @IsNotEmpty()
  @IsNumber()
  id_oeuvre: number;

  @IsNotEmpty()
  @IsString()
  contenu: string;
}
