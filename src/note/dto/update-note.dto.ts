import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @IsNumber()
  note: number;
}
