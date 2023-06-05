import { Module } from '@nestjs/common';
import { OeuvreService } from './oeuvre.service';
import { OeuvreController } from './oeuvre.controller';
import { CategorieService } from '../categorie/categorie.service';

@Module({
  providers: [OeuvreService, CategorieService],
  controllers: [OeuvreController],
})
export class OeuvreModule {}
