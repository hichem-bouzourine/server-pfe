import { Controller, Get } from '@nestjs/common';
import { ArtisanService } from './artisan.service';

@Controller('artisan')
export class ArtisanController {
  constructor(private artisanService: ArtisanService) {}

  @Get('artisans')
  getAll() {
    return this.artisanService.getAll();
  }
}
