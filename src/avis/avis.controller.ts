import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AvisService } from './avis.service';
import { CreateAviDto } from './dto/create-avi.dto';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  @Post()
  create(@Body() createAviDto: CreateAviDto) {
    return this.avisService.create(createAviDto);
  }

  @Get()
  findAll(@Query('id_oeuvre', ParseIntPipe) id_oeuvre: number) {
    return this.avisService.findAllForOeuvre(id_oeuvre);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.avisService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.avisService.remove(+id);
  }
}
