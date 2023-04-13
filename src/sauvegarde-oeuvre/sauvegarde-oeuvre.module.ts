import { Module } from '@nestjs/common';
import { SauvegardeOeuvreService } from './sauvegarde-oeuvre.service';
import { SauvegardeOeuvreController } from './sauvegarde-oeuvre.controller';
import { OeuvreService } from '../oeuvre/oeuvre.service';
import { CategorieService } from '../categorie/categorie.service';

@Module({
  controllers: [SauvegardeOeuvreController],
  providers: [SauvegardeOeuvreService, OeuvreService, CategorieService],
})
export class SauvegardeOeuvreModule {}
