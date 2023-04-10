import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @CurrentUser('id_utilisateur') id: number,
  ) {
    return this.noteService.create(createNoteDto, id);
  }

  @Get(':id_oeuvre')
  findOne(
    @Param('id_oeuvre') id_oeuvre: number,
    @CurrentUser('id_utilisateur') id: number,
  ) {
    return this.noteService.findOne(id_oeuvre, id);
  }

  @Patch(':id_oeuvre')
  update(
    @Param('id_oeuvre') id_oeuvre: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @CurrentUser('id_utilisateur') id: number,
  ) {
    return this.noteService.update(id_oeuvre, updateNoteDto, id);
  }

  @Delete(':id_oeuvre')
  remove(
    @Param('id_oeuvre') id_oeuvre: number,
    @CurrentUser('id_utilisateur') id: number,
  ) {
    return this.noteService.remove(id_oeuvre, id);
  }
}
