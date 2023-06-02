import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum Type_User {
  ADMIN = 'ADMIN',
  ARTISAN = 'ARTISAN',
  CLIENT = 'CLIENT',
  FOURNISSEUR = 'FOURNISSEUR',
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_de_naissance?: Date;

  @IsOptional()
  @IsString()
  sexe?: string;

  @IsOptional()
  @IsNumber()
  id_adresse?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsEnum(Type_User)
  type?: Type_User;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_inscription?: Date;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  annee_debut_experience?: number;

  @IsNumber()
  @IsOptional()
  preference_art?: number;

  @IsNumber()
  @IsOptional()
  specialite?: number;

  @IsString()
  @IsOptional()
  raison_social?: string;

  @IsOptional()
  @IsBoolean()
  statutCompte?: boolean;

  @IsString()
  @IsOptional()
  document?: string;
}
