import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategorieFournitureDto {
  @IsOptional()
  @IsNotEmpty()
  nom_fourniture: string;

  @IsOptional()
  @IsNotEmpty()
  photo: string;
}
