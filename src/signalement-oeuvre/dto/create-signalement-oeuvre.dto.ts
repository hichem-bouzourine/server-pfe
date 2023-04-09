import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSignalementOeuvreDto {
  @IsNotEmpty()
  @IsString()
  raison: string;

  @IsNotEmpty()
  @IsNumber()
  id_oeuvre: number;

  @IsNotEmpty()
  @IsNumber()
  id_client: number;
}
