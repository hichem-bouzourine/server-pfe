import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategorieDto {
  @IsNotEmpty()
  @IsString()
  nom_categorie: string;

  @IsNotEmpty()
  @IsString()
  image_categorie: string;

  @IsOptional()
  @IsString()
  description?: string;
}
