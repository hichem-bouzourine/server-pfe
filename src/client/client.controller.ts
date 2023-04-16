import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('clients')
  getAll() {
    return this.clientService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getOne(id);
  }

  @Get('search/name')
  getManyByName(@Query('nom') nom: string, @Query('prenom') prenom: string) {
    return this.clientService.getManyByName(nom, prenom);
  }
}
