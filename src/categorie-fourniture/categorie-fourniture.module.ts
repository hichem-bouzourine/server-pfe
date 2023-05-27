import { Module } from '@nestjs/common';
import { CategorieFournitureService } from './categorie-fourniture.service';
import { CategorieFournitureController } from './categorie-fourniture.controller';

@Module({
  controllers: [CategorieFournitureController],
  providers: [CategorieFournitureService]
})
export class CategorieFournitureModule {}
