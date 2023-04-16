import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ArtisanService } from './artisan.service';

@Controller('artisan')
export class ArtisanController {
  constructor(private artisanService: ArtisanService) {}

  @Get('artisans')
  getAll() {
    return this.artisanService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.artisanService.getOne(id);
  }

  @Get('search/name')
  getManyByName(@Query('nom') nom: string, @Query('prenom') prenom: string) {
    return this.artisanService.getManyByName(nom, prenom);
  }
}
