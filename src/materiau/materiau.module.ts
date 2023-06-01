import { Module } from '@nestjs/common';
import { MateriauService } from './materiau.service';
import { MateriauController } from './materiau.controller';

@Module({
  controllers: [MateriauController],
  providers: [MateriauService]
})
export class MateriauModule {}
