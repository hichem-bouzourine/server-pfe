import { Controller, Get, Param } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';

@Controller('fournisseur')
export class FournisseurController {
  constructor(private fournisseurService: FournisseurService) {}

  @Get('fournisseurs')
  getAll() {
    return this.fournisseurService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.fournisseurService.getOne(id);
  }
}
