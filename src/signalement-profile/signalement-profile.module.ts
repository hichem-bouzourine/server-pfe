import { Module } from '@nestjs/common';
import { SignalementProfileService } from './signalement-profile.service';
import { SignalementProfileController } from './signalement-profile.controller';

@Module({
  controllers: [SignalementProfileController],
  providers: [SignalementProfileService]
})
export class SignalementProfileModule {}
