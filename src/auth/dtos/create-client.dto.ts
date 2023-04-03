import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateClientDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  preference_art: string;
}
