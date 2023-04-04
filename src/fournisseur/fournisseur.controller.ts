import { Controller } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';

@Controller('fournisseur')
export class FournisseurController {
  constructor(private fournisseurService: FournisseurService) {}
}
