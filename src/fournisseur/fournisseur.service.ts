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
      specialite,
      statutCompte,
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
        Fournisseur: {
          create: {
            specialite,
            statutCompte,
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
    const users = await this.prismaService.fournisseur.findMany({
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
        specialite: true,
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
        specialite: true,
        statutCompte: true,
      },
    });

    if (!user) throw new NotFoundException('Fournisseur not found');

    return user;
  }
}
