import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateClientDto extends CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  preference_art: number;
}
