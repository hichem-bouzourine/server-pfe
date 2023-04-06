import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateOeuvreDto {
  @IsString()
  @IsNotEmpty()
  titre_oeuvre: string;

  @IsDateString()
  @IsNotEmpty()
  date_realisation: Date;

  @IsString()
  @IsNotEmpty()
  contexte_realisation: string;

  @IsString()
  @IsNotEmpty()
  dimensions: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  techniques_et_materiaux: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  prix: number;

  @IsDateString()
  @IsNotEmpty()
  date_publication: Date;

  @IsArray()
  @ArrayNotEmpty()
  images_oeuvre: string[];

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  id_categorie: number;

  // @IsNumber()
  // @Min(1)
  // @IsNotEmpty()
  // id_artisan: number;
}
