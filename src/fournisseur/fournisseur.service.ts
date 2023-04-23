import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashPassword } from '../auth/common/hashPassword';
import { CreateFournisseurDto } from '../auth/dtos/create-fournisseur.dto';
import { PrismaService } from '../prisma/prisma.service';
import { signToken } from '../utils/signtoken.jwt';
import { utilisateurSelect } from '../types/utilisateur-select';

@Injectable()
export class FournisseurService {
  constructor(private prismaService: PrismaService) {}

  async createFournisseur(body: CreateFournisseurDto) {
    const {
      raison_social,
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
        Fournisseur: {
          create: {
            raison_social,
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
    const users = await this.prismaService.fournisseur.findMany({
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
        raison_social: true,
        statutCompte: true,
      },
    });

    if (!users.length) throw new NotFoundException('Fournisseurs not found');

    return users;
  }

  async getOne(id: number) {
    const user = await this.prismaService.fournisseur.findUnique({
      where: {
        id_fournisseur: id,
      },
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
        raison_social: true,
        statutCompte: true,
      },
    });

    if (!user) throw new NotFoundException('Fournisseur not found');

    return user;
  }
}
