import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from '../auth/dtos/create-admin.dto';
import { hashPassword } from '../auth/common/hashPassword';
import { PrismaService } from '../prisma/prisma.service';
import { signToken } from '../utils/signtoken.jwt';
import { utilisateurSelect } from '../types/utilisateur-select';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async createAdmin(body: CreateAdminDto) {
    const { date_de_naissance, date_inscription, password, ...userData } = body;

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
        Administrateur: {
          create: {},
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
    const users = await this.prismaService.administrateur.findMany({
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
      },
    });

    if (!users.length) throw new NotFoundException('Admins not found');

    return users;
  }

  async getOne(id: number) {
    const user = await this.prismaService.administrateur.findUnique({
      where: {
        id_admin: id,
      },
      select: {
        Utilisateur: {
          select: {
            ...utilisateurSelect,
          },
        },
      },
    });

    if (!user) throw new NotFoundException(`Admin with id '${id}' not found`);

    return user;
  }

  async getFullList() {
    const users = await this.prismaService.utilisateur.findMany({
      select: {
        ...utilisateurSelect,
        Administrateur: true,
        Artisan: true,
        Fournisseur: true,
        Client: true,
      },
    });

    if (!users.length) throw new NotFoundException('No users in the database');
    return users;
  }
}
