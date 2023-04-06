import {
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
  IsNumber,
  ArrayNotEmpty,
} from 'class-validator';

export class UpdateOeuvreDto {
  @IsOptional()
  @IsString()
  titre_oeuvre?: string;

  @IsOptional()
  @IsDateString()
  date_realisation?: Date;

  @IsOptional()
  @IsString()
  contexte_realisation?: string;

  @IsOptional()
  @IsString()
  dimensions?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  techniques_et_materiaux?: string;

  @IsOptional()
  @IsNumber()
  prix?: number;

  @IsOptional()
  @IsDateString()
  date_publication?: Date;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  images_oeuvre?: string[];

  @IsOptional()
  @IsNumber()
  id_categorie?: number;

  // @IsOptional()
  // @IsNumber()
  // id_artisan?: number;
}
