import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { Server, Socket } from 'socket.io';
import { Message } from '@prisma/client';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messageService: MessageService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { id_user1: number; id_user2: number },
    @ConnectedSocket() client: Socket,
  ) {
    // Retrieve messages from the database and send them to the client
    const conversation = await this.messageService.getMessagesByConversationId(
      data.id_user1,
      data.id_user2,
    );
    const messages: Message[] | [] = conversation.messages;

    client.join(conversation.id_conversation.toString());

    client.emit('loadMessages', messages);
    client.emit('connectedRoom', conversation.id_conversation.toString());
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(
    @MessageBody() data: { id_conversation: number },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.id_conversation.toString());
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: { id_conversation: number; id_destinateur: number; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Save the message to the database
    const newMessage = await this.messageService.createMessage(
      data.id_conversation,
      data.id_destinateur,
      data.message,
    );

    // Broadcast the new message to all clients in the conversation room
    // in the UI, we should listen to the event 'newMessage'
    client.emit('newMessage', newMessage);
  }
}
