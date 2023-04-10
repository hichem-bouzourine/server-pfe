import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAviDto {
  @IsNotEmpty()
  @IsNumber()
  id_client: number;

  @IsNotEmpty()
  @IsNumber()
  id_oeuvre: number;

  @IsNotEmpty()
  @IsString()
  contenu: string;
}
