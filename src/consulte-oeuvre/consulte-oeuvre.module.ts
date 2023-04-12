import { Module } from '@nestjs/common';
import { ConsulteOeuvreService } from './consulte-oeuvre.service';
import { ConsulteOeuvreController } from './consulte-oeuvre.controller';

@Module({
  controllers: [ConsulteOeuvreController],
  providers: [ConsulteOeuvreService]
})
export class ConsulteOeuvreModule {}
