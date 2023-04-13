import { Module } from '@nestjs/common';
import { ConsulteCategorieService } from './consulte-categorie.service';
import { ConsulteCategorieController } from './consulte-categorie.controller';

@Module({
  controllers: [ConsulteCategorieController],
  providers: [ConsulteCategorieService]
})
export class ConsulteCategorieModule {}
