import { Module } from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { ArtisanController } from './artisan.controller';
import { AdresseService } from '../adresse/adresse.service';

@Module({
  imports: [],
  providers: [ArtisanService, AdresseService],
  controllers: [ArtisanController],
})
export class ArtisanModule {}
