import { Module } from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { ArtisanController } from './artisan.controller';

@Module({
  imports: [],
  providers: [ArtisanService],
  controllers: [ArtisanController],
})
export class ArtisanModule {}
