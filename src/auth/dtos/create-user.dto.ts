import { Type_User } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date_de_naissance: Date;

  @IsString()
  @IsNotEmpty()
  sexe: string;

  @IsString()
  @IsNotEmpty()
  Rue: string;

  @IsNumber()
  @IsNotEmpty()
  id_Commune: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsNotEmpty()
  type: Type_User;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date_inscription: Date;

  @IsString()
  @IsOptional()
  photo?: string;
}
