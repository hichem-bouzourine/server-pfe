import { Controller } from '@nestjs/common';
import { ArtisanService } from './artisan.service';

@Controller('artisan')
export class ArtisanController {
  constructor(private artisanService: ArtisanService) {}
}
