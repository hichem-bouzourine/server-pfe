import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechniqueDto {
  @IsString()
  @IsNotEmpty()
  nom: string;
}
