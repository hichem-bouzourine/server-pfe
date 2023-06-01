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
import { TechniqueService } from './technique.service';
import { CreateTechniqueDto } from './dtos/create-technique.dto';
import { UpdateTechniqueDto } from './dtos/update-technique.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';

@Controller('technique')
export class TechniqueController {
  constructor(private readonly techniqueService: TechniqueService) {}

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTechniqueDto: CreateTechniqueDto) {
    return this.techniqueService.create(createTechniqueDto);
  }

  @Get()
  findAll() {
    return this.techniqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.techniqueService.findOne(id);
  }

  @Get('search/:nom_technique')
  findByNomTechnique(@Param('nom_technique') nom_technique: string) {
    return this.techniqueService.findByNomTechnique(nom_technique);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechniqueDto: UpdateTechniqueDto,
  ) {
    return this.techniqueService.update(id, updateTechniqueDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.techniqueService.remove(id);
  }
}
