import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { ArtisanModule } from './artisan/artisan.module';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    AuthModule,
    PrismaModule,
    FournisseurModule,
    ArtisanModule,
    ClientModule,
    AdminModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
