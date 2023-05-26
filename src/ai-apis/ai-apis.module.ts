import { Module } from '@nestjs/common';
import { AiApisController } from './ai-apis.controller';
import { AiApisService } from './ai-apis.service';

@Module({
  controllers: [AiApisController],
  providers: [AiApisService]
})
export class AiApisModule {}
