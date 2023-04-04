import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('clients')
  getAll() {
    return this.clientService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.clientService.getOne(id);
  }
}
