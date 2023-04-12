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
import { CategorieModule } from './categorie/categorie.module';
import { OeuvreModule } from './oeuvre/oeuvre.module';
import { SignalementProfileModule } from './signalement-profile/signalement-profile.module';
import { SignalementOeuvreModule } from './signalement-oeuvre/signalement-oeuvre.module';
import { SignalementAvisModule } from './signalement-avis/signalement-avis.module';
import { AvisModule } from './avis/avis.module';
import { ReponseModule } from './reponse/reponse.module';
import { NoteModule } from './note/note.module';
import { ConsulteOeuvreModule } from './consulte-oeuvre/consulte-oeuvre.module';

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
    OeuvreModule,
    CategorieModule,
    SignalementProfileModule,
    SignalementOeuvreModule,
    SignalementAvisModule,
    AvisModule,
    ReponseModule,
    NoteModule,
    ConsulteOeuvreModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
