import { IsOptional, IsString } from 'class-validator';

export class UpdateMateriauDto {
  @IsString()
  @IsOptional()
  nom: string;
}
