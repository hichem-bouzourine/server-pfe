import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateArtisanDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  annee_debut_experience: number;

  @IsNumber()
  @IsNotEmpty()
  specialite: number;

  @IsBoolean()
  @IsNotEmpty()
  statutCompte: boolean;

  @IsString()
  @IsNotEmpty()
  document: string;
}
