import { Module } from '@nestjs/common';
import { AvisService } from './avis.service';
import { AvisController } from './avis.controller';
import { ClientService } from '../client/client.service';
import { OeuvreService } from '../oeuvre/oeuvre.service';
import { CategorieService } from '../categorie/categorie.service';
import { AdresseService } from 'src/adresse/adresse.service';

@Module({
  controllers: [AvisController],
  providers: [
    AvisService,
    ClientService,
    OeuvreService,
    CategorieService,
    AdresseService,
  ],
})
export class AvisModule {}
