import { Module } from '@nestjs/common';
import { ReponseService } from './reponse.service';
import { ReponseController } from './reponse.controller';
import { OeuvreService } from '../oeuvre/oeuvre.service';
import { AvisService } from '../avis/avis.service';
import { CategorieService } from '../categorie/categorie.service';
import { ClientService } from '../client/client.service';
import { AdresseService } from 'src/adresse/adresse.service';

@Module({
  controllers: [ReponseController],
  providers: [
    ReponseService,
    OeuvreService,
    AvisService,
    CategorieService,
    ClientService,
    AdresseService,
  ],
})
export class ReponseModule {}
