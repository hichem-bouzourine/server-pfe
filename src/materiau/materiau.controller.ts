import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MateriauService } from './materiau.service';
import { CreateMateriauDto } from './dtos/create-materiau.dto';
import { UpdateMateriauDto } from './dtos/update-materiau.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('materiau')
export class MateriauController {
  constructor(private readonly materiauService: MateriauService) {}

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMateriauDto: CreateMateriauDto) {
    return this.materiauService.create(createMateriauDto);
  }

  @Get()
  findAll() {
    return this.materiauService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materiauService.findOne(id);
  }

  @Get('search/:nom_materiau')
  findByNomMateriau(@Param('nom_materiau') nom_materiau: string) {
    return this.materiauService.findByNomMateriau(nom_materiau);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMateriauDto: UpdateMateriauDto,
  ) {
    return this.materiauService.update(id, updateMateriauDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materiauService.remove(id);
  }
}
