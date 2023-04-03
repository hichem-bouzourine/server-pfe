import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateFournisseurDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  specialite: string;

  @IsBoolean()
  @IsNotEmpty()
  statutCompte: boolean;
}
