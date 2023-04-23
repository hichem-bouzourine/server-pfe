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
  date_de_naissance?: Date;

  @IsOptional()
  @IsString()
  sexe?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  adresse?: string;

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
  date_inscription?: Date;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  annee_experience?: number;

  @IsNumber()
  @IsOptional()
  preference_art?: number;

  @IsString()
  @IsOptional()
  specialite?: string;

  @IsOptional()
  @IsBoolean()
  statutCompte?: boolean;
}
