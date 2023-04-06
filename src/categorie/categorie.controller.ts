import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from '.prisma/client';
import { CategorieService } from './categorie.service';
import { AdminGuard } from '../admin/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Get()
  findAll(): Promise<Categorie[]> {
    return this.categorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Categorie> {
    return this.categorieService.findOne(id);
  }

  @Get('search/:nom_categorie')
  findByNomCategorie(@Param('nom_categorie') nom_categorie: string) {
    return this.categorieService.findByNomCategorie(nom_categorie);
  }

  @Post()
  create(@Body() createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    return this.categorieService.create(createCategorieDto);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategorieDto: UpdateCategorieDto,
  ): Promise<Categorie> {
    return this.categorieService.update(id, updateCategorieDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Categorie> {
    return this.categorieService.remove(id);
  }
}
