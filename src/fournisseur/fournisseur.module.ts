import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';

@Module({
  providers: [FournisseurService]
})
export class FournisseurModule {}
