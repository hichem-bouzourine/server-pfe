import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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

  @Get()
  findOne(
    @Query('id_oeuvre') id_oeuvre: number,
    @Query('id_client') id_client: number,
  ) {
    return this.noteService.findOne(id_oeuvre, id_client);
  }

  @Get('avg')
  getCountAndAvgForOeuvre(@Query('id_oeuvre') id_oeuvre: number) {
    return this.noteService.getCountAndAvgForOeuvre(id_oeuvre);
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
