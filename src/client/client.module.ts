import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { AdresseService } from '../adresse/adresse.service';

@Module({
  imports: [],
  providers: [ClientService, AdresseService],
  controllers: [ClientController],
})
export class ClientModule {}
