import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { FournisseurController } from './fournisseur.controller';

@Module({
  imports: [],
  providers: [FournisseurService],
  controllers: [FournisseurController],
})
export class FournisseurModule {}
