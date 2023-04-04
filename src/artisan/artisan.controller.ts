import { Controller, Get, Param } from '@nestjs/common';
import { ArtisanService } from './artisan.service';

@Controller('artisan')
export class ArtisanController {
  constructor(private artisanService: ArtisanService) {}

  @Get('artisans')
  getAll() {
    return this.artisanService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.artisanService.getOne(id);
  }
}
