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
      email,
      ...userData
    } = body;

    // Check if user exists already exists
    const userByEmail = await this.prismaService.utilisateur.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (userByEmail) throw new BadRequestException('user already exists');

    // Check if `preference_art` is referencing categorie
    const categorie = await this.prismaService.categorie.findUnique({
      where: {
        id_categorie: preference_art,
      },
    });

    if (!categorie) {
      throw new NotFoundException(
        `preference art for categorie with id ${preference_art} not found`,
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.utilisateur.create({
      data: {
        ...userData,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        date_de_naissance: new Date(date_de_naissance),
        date_inscription: new Date(date_inscription),
        Client: {
          create: {
            preference_art,
          },
        },
      },
      select: {
        ...utilisateurSelect,
        Administrateur: true,
        Artisan: true,
        Fournisseur: true,
        Client: true,
      },
    });

    const { password: storedPassword, ...rest } = user;

    const token = await signToken(
      user.id_utilisateur,
      user.email.toLowerCase().trim(),
      user.type,
    );

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

  async getManyByName(nom: string, prenom: string) {
    const clients = await this.prismaService.client.findMany({
      where: {
        Utilisateur: {
          AND: [
            {
              OR: [
                {
                  nom: {
                    contains: nom,
                    mode: 'insensitive',
                  },
                },
                {
                  prenom: {
                    contains: prenom,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            {
              OR: [
                {
                  prenom: {
                    contains: prenom,
                    mode: 'insensitive',
                  },
                },
                {
                  nom: {
                    contains: nom,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          ],
        },
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

    if (!clients.length) {
      throw new NotFoundException(`No Client found with nom: ${nom}`);
    }

    return clients;
  }
}
