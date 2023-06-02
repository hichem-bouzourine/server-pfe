import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateFournisseurDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  raison_social: string;

  @IsBoolean()
  @IsNotEmpty()
  statutCompte: boolean;

  @IsString()
  @IsNotEmpty()
  document: string;
}
