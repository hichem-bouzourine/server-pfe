import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AdresseService } from './adresse.service';
import { CreateAdresseDto } from './dto/create-adresse.dto';

@Controller('adresse')
export class AdresseController {
  constructor(private readonly adresseService: AdresseService) {}

  @Post()
  create(@Body() createAdresseDto: CreateAdresseDto) {
    return this.adresseService.createAdresse(createAdresseDto);
  }

  @Get('/wilaya')
  findAllWilayas() {
    return this.adresseService.findAllWilayas();
  }

  @Get('/daira/:id_wilaya')
  findDairaByWilaya(@Param('id_wilaya', ParseIntPipe) id_wilaya: number) {
    return this.adresseService.findDairaByWilaya(id_wilaya);
  }

  @Get('/commune/:id_daira')
  findCommuneByDaira(@Param('id_daira', ParseIntPipe) id_daira: number) {
    return this.adresseService.findCommuneByDaira(id_daira);
  }
}
