import { Module } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { ArtisanService } from '../artisan/artisan.service';
import { ClientService } from '../client/client.service';
import { FournisseurService } from '../fournisseur/fournisseur.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    FournisseurService,
    ArtisanService,
    ClientService,
    AdminService,
  ],
})
export class AuthModule {}
