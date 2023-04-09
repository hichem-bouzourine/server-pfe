import { Module } from '@nestjs/common';
import { SignalementOeuvreService } from './signalement-oeuvre.service';
import { SignalementOeuvreController } from './signalement-oeuvre.controller';

@Module({
  controllers: [SignalementOeuvreController],
  providers: [SignalementOeuvreService]
})
export class SignalementOeuvreModule {}
