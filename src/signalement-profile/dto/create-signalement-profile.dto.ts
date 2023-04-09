import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateSignalementProfileDto {
  @IsNotEmpty()
  @IsString()
  raison: string;

  @IsNotEmpty()
  @IsNumber()
  id_signale: number;

  @IsNotEmpty()
  @IsNumber()
  id_rapporteur: number;
}
