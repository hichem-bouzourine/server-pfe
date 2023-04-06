import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { OeuvreService } from './oeuvre.service';
import { CreateOeuvreDto } from './dtos/create-oeuvre.dto';
import { UpdateOeuvreDto } from './dtos/update-oeuvre.dto';
import { CurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('oeuvre')
export class OeuvreController {
  constructor(private readonly oeuvreService: OeuvreService) {}

  @Get()
  findAll() {
    return this.oeuvreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.oeuvreService.findOne(id);
  }

  @Get('search/:titre')
  findByTitreOeuvre(@Param('titre') titre_oeuvre: string) {
    return this.oeuvreService.findByTitreOeuvre(titre_oeuvre);
  }

  @Post()
  create(
    @CurrentUser('id_utilisateur') userId: number,
    @CurrentUser('type') type: string,
    @Body() createOeuvreDto: CreateOeuvreDto,
  ) {
    return this.oeuvreService.create(userId, type, createOeuvreDto);
  }

  @Patch('/:id')
  update(
    @CurrentUser('id_utilisateur') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOeuvreDto: UpdateOeuvreDto,
  ) {
    return this.oeuvreService.update(userId, id, updateOeuvreDto);
  }

  @Delete(':id')
  remove(
    @CurrentUser('id_utilisateur') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.oeuvreService.remove(userId, id);
  }
}
