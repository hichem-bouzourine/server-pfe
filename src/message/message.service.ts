import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Conversation, Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  // find all conversations for a user
  async findAllConversations(id_destinateur: number) {
    const conversations = await this.prismaService.conversation.findMany({
      where: {
        OR: [{ id_user1: id_destinateur }, { id_user2: id_destinateur }],
      },
    });

    return conversations;
  }

  /**
   * return the messages of a given conversation
   * @param id_user1
   * @param id_user2
   * @returns Message[] of the conversation
   * @throws {UnauthorizedException} if the sender is not part of the conversation's users
   */
  async getMessagesByConversationId(id_user1: number, id_user2: number) {
    const user1 = await this.prismaService.utilisateur.findUnique({
      where: { id_utilisateur: id_user1 },
    });
    const user2 = await this.prismaService.utilisateur.findUnique({
      where: { id_utilisateur: id_user2 },
    });
    if (!user1 || !user2) {
      throw new NotFoundException(`User not found`);
    }

    const conversation = await this.prismaService.conversation.findFirst({
      where: {
        AND: [
          { OR: [{ id_user1: id_user1 }, { id_user1: id_user2 }] },
          { OR: [{ id_user2: id_user1 }, { id_user2: id_user2 }] },
        ],
      },
      select: {
        messages: true,
        id_user1: true,
        id_user2: true,
        id_conversation: true,
      },
    });

    if (conversation) {
      return conversation;
    } else {
      return await this.prismaService.conversation.create({
        data: {
          id_user1,
          id_user2,
        },
        select: {
          id_conversation: true,
          messages: true,
          id_user1: true,
          id_user2: true,
        },
      });
    }
  }

  async getMessagesForConversation(
    conversation: Conversation,
  ): Promise<Message[]> {
    const messages = await this.prismaService.message.findMany({
      where: {
        id_conversation: conversation.id_conversation,
      },
      orderBy: {
        date_message: 'asc',
      },
      include: {
        utilisateur: true,
      },
    });
    return messages;
  }

  async createMessage(
    id_conversation: number,
    id_destinateur: number,
    contenu: string,
  ): Promise<Message> {
    const utilisateur = await this.prismaService.utilisateur.findUnique({
      where: { id_utilisateur: id_destinateur },
    });
    if (!utilisateur) {
      throw new BadRequestException(
        `User with id ${id_destinateur} does not exist`,
      );
    }

    const conversation = await this.prismaService.conversation.findUnique({
      where: { id_conversation },
    });
    if (!conversation) {
      throw new BadRequestException(
        `Conversation with id ${id_conversation} does not exist`,
      );
    }

    if (
      id_destinateur !== conversation.id_user1 &&
      id_destinateur !== conversation.id_user2
    ) {
      throw new UnauthorizedException('You are not part of this conversation');
    }

    const message = await this.prismaService.message.create({
      data: {
        date_message: new Date(),
        contenu,
        utilisateur: {
          connect: {
            id_utilisateur: id_destinateur,
          },
        },
        conversation: {
          connect: {
            id_conversation,
          },
        },
      },
    });

    return message;
  }
}
