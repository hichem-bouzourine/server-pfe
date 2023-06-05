import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategorieFournitureService } from './categorie-fourniture.service';
import { CreateCategorieFournitureDto } from './dto/create-categorie-fourniture.dto';
import { UpdateCategorieFournitureDto } from './dto/update-categorie-fourniture.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';

@Controller('categorie-fourniture')
export class CategorieFournitureController {
  constructor(
    private readonly categorieFournitureService: CategorieFournitureService,
  ) {}

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCategorieFournitureDto: CreateCategorieFournitureDto) {
    return this.categorieFournitureService.create(createCategorieFournitureDto);
  }

  @Get()
  findAll() {
    return this.categorieFournitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categorieFournitureService.findOne(id);
  }

  @Get('search/name/:nom_fourniture')
  findByNomFourniture(@Param('nom_fourniture') nom_fourniture: string) {
    return this.categorieFournitureService.findByNomFourniture(nom_fourniture);
  }

  @Get('search/id/:id_fourniture')
  findMany(@Param('id_fourniture', ParseIntPipe) id_fourniture: number) {
    return this.categorieFournitureService.getPublicationsByIDFourniture(
      id_fourniture,
    );
  }

  @Get('search/name-pubs/:nom_fourniture')
  findPublicationsByNomFournitures(
    @Param('nom_fourniture') nom_fourniture: string,
  ) {
    return this.categorieFournitureService.findPublicationsByNomFournitures(
      nom_fourniture,
    );
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategorieFournitureDto: UpdateCategorieFournitureDto,
  ) {
    return this.categorieFournitureService.update(
      id,
      updateCategorieFournitureDto,
    );
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categorieFournitureService.remove(id);
  }
}
