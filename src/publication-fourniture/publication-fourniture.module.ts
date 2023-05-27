import { Module } from '@nestjs/common';
import { PublicationFournitureService } from './publication-fourniture.service';
import { PublicationFournitureController } from './publication-fourniture.controller';
import { CategorieFournitureService } from '../categorie-fourniture/categorie-fourniture.service';

@Module({
  controllers: [PublicationFournitureController],
  providers: [PublicationFournitureService, CategorieFournitureService],
})
export class PublicationFournitureModule {}
