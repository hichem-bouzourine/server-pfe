import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsNumber()
  id_oeuvre: number;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @IsNumber()
  note: number;
}
