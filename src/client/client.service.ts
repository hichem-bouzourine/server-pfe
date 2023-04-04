import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashPassword } from '../auth/common/hashPassword';
import { CreateClientDto } from '../auth/dtos/create-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { signToken } from '../utils/signtoken.jwt';
import { utilisateurSelect } from '../types/utilisateur-select';

@Injectable()
export class ClientService {
  constructor(private prismaService: PrismaService) {}

  async createClient(body: CreateClientDto) {
    const {
      preference_art,
      date_de_naissance,
      date_inscription,
      password,
      ...userData
    } = body;

    // Check if user exists already exists
    const userByEmail = await this.prismaService.utilisateur.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (userByEmail) throw new BadRequestException('user already exists');

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.utilisateur.create({
      data: {
        ...userData,
        password: hashedPassword,
        date_de_naissance: new Date(date_de_naissance),
        date_inscription: new Date(date_inscription),
        Client: {
          create: {
            preference_art,
          },
        },
      },
    });

    const { password: storedPassword, ...rest } = user;

    const token = await signToken(user.id_utilisateur, user.email, user.type);

    return {
      user: rest,
      token,
    };
  }

  async getAll() {
    const users = await this.prismaService.client.findMany({
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
        preference_art: true,
      },
    });

    if (!users.length) throw new NotFoundException('Clients not found');

    return users;
  }

  async getOne(id: number) {
    const user = await this.prismaService.client.findUnique({
      where: {
        id_client: id,
      },
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
        preference_art: true,
      },
    });

    if (!user) throw new NotFoundException(`Client with id '${id}' not found`);

    return user;
  }
}
