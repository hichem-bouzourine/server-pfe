import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateArtisanDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  annee_experience: number;

  @IsString()
  @IsNotEmpty()
  specialite: string;

  @IsBoolean()
  @IsNotEmpty()
  statutCompte: boolean;
}
