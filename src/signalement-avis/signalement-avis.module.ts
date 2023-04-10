import { Module } from '@nestjs/common';
import { SignalementAvisService } from './signalement-avis.service';
import { SignalementAvisController } from './signalement-avis.controller';

@Module({
  controllers: [SignalementAvisController],
  providers: [SignalementAvisService]
})
export class SignalementAvisModule {}
