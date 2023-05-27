import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePublicationFournitureDto {
  @IsNumber()
  @IsOptional()
  prix: number;

  @IsNumber()
  @IsOptional()
  quantite: number;
}
