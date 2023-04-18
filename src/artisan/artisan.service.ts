import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtisanDto } from '../auth/dtos/create-artisan.dto';
import { hashPassword } from '../auth/common/hashPassword';
import { PrismaService } from '../prisma/prisma.service';
import { signToken } from '../utils/signtoken.jwt';
import { utilisateurSelect } from '../types/utilisateur-select';
import { Artisan, Utilisateur } from '@prisma/client';

@Injectable()
export class ArtisanService {
  constructor(private prismaService: PrismaService) {}

  async createArtisan(body: CreateArtisanDto) {
    const {
      description,
      annee_experience,
      specialite,
      statutCompte,
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

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.utilisateur.create({
      data: {
        ...userData,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        date_de_naissance: new Date(date_de_naissance),
        date_inscription: new Date(date_inscription),
        Artisan: {
          create: {
            description,
            annee_experience,
            specialite,
            statutCompte,
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
    const users = await this.prismaService.artisan.findMany({
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
        description: true,
        annee_experience: true,
        specialite: true,
        statutCompte: true,
      },
    });

    if (!users.length) throw new NotFoundException('Artisans not found');

    return users;
  }

  async getOne(id: number) {
    const user = await this.prismaService.artisan.findUnique({
      where: {
        id_artisan: id,
      },
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
        description: true,
        annee_experience: true,
        specialite: true,
        statutCompte: true,
      },
    });

    if (!user) throw new NotFoundException(`Artisan with id '${id}' not found`);

    return user;
  }

  async getManyByName(nom: string, prenom: string) {
    const artisans = await this.prismaService.artisan.findMany({
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
        description: true,
        annee_experience: true,
        specialite: true,
        statutCompte: true,
      },
    });

    if (!artisans.length) {
      throw new NotFoundException(
        `No Artisan found with nom: ${nom} ${prenom}`,
      );
    }

    return artisans;
  }

  async getAllOeuvresForArtisan(id_artisan: number) {
    await this.getOne(id_artisan);

    const oeuvres = await this.prismaService.oeuvre.findMany({
      where: {
        id_artisan,
      },
    });

    if (!oeuvres.length) {
      throw new NotFoundException(
        `No oeuvre found for artisan with ID ${id_artisan}`,
      );
    }

    return oeuvres;
  }
}
