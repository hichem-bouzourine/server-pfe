import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { ArtisanModule } from './artisan/artisan.module';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    FournisseurModule,
    ArtisanModule,
    ClientModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
