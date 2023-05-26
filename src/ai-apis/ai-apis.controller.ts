import { Body, Controller, Post } from '@nestjs/common';
import { AiApisService } from './ai-apis.service';

@Controller('ai-apis')
export class AiApisController {
  constructor(private aiApisService: AiApisService) {}

  @Post('/openai/description')
  openAi(@Body() body: { prompt: string }) {
    return this.aiApisService.openAi(body.prompt);
  }
}
