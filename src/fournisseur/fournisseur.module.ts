import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { FournisseurController } from './fournisseur.controller';
import { AdresseService } from '../adresse/adresse.service';

@Module({
  imports: [],
  providers: [FournisseurService, AdresseService],
  controllers: [FournisseurController],
})
export class FournisseurModule {}
