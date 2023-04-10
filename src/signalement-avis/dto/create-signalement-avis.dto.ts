import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSignalementAvisDto {
  @IsNotEmpty()
  @IsString()
  raison: string;

  @IsNotEmpty()
  @IsNumber()
  id_avis: number;

  @IsNotEmpty()
  @IsNumber()
  id_client: number;
}
