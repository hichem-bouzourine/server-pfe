import { IsOptional, IsString } from 'class-validator';

export class UpdateCategorieDto {
  @IsOptional()
  @IsString()
  nom_categorie?: string;

  @IsOptional()
  @IsString()
  image_categorie?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
