import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePublicationFournitureDto {
  @IsNumber()
  @IsNotEmpty()
  id_fourniture: number;

  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @IsNumber()
  @IsNotEmpty()
  quantite: number;
}
