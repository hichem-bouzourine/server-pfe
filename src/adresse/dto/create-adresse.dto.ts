import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdresseDto {
  @IsString()
  @IsNotEmpty()
  Rue: string;

  @IsNumber()
  @IsNotEmpty()
  id_Commune: number;
}
