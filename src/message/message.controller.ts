import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('message')
export class MessageController {
  constructor(private messagesService: MessageService) {}

  @Get()
  findAllConversations(@CurrentUser('id_utilisateur') id_utilisateur: number) {
    return this.messagesService.findAllConversations(id_utilisateur);
  }
}
