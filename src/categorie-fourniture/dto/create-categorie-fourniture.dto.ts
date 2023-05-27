import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategorieFournitureDto {
  @IsString()
  @IsNotEmpty()
  nom_fourniture: string;

  @IsString()
  @IsNotEmpty()
  photo: string;
}
