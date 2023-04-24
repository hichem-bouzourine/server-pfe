import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdresseService } from '../adresse/adresse.service';

@Module({
  imports: [],
  providers: [AdminService, AdresseService],
  controllers: [AdminController],
})
export class AdminModule {}
