import { IsOptional, IsString } from 'class-validator';

export class UpdateTechniqueDto {
  @IsString()
  @IsOptional()
  nom: string;
}
