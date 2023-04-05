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
import { UpdateUserDto } from 'src/auth/dtos/update-user-.dto';
import { Type_User } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async createAdmin(body: CreateAdminDto) {
    const {
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
        Administrateur: {
          create: {},
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

  /**
   * Get All administrators
   * @returns Administrateur[]
   */
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

  /**
   * Get one specific Admin
   * @param id
   * @returns Admin.
   */
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

  /**
   * Get all the users of the application.
   * @returns Utilisateur[]
   */
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

  /**
   * Get user by its email
   * @param email
   * @returns Utilisateur
   */
  async getOneUser(email: string) {
    const user = await this.prismaService.utilisateur.findUnique({
      where: {
        email,
      },
      select: {
        ...utilisateurSelect,
        Administrateur: true,
        Artisan: true,
        Fournisseur: true,
        Client: true,
      },
    });

    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  /**
   * Updates properties of user
   * @param userId
   * @param body
   * @returns Utilisateur
   *
   * @example updateUser(11, {nom: "hichem"}) => Utilisateur
   */
  async updateUser(userId: number, body: UpdateUserDto) {
    // Search for user with his ID
    const user = await this.prismaService.utilisateur.findUnique({
      where: { id_utilisateur: userId },
      select: {
        ...utilisateurSelect,
        Administrateur: true,
        Artisan: true,
        Fournisseur: true,
        Client: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const {
      annee_experience,
      description,
      specialite,
      statutCompte,
      preference_art,
      email,
      ...rest
    } = body;

    switch (user.type) {
      case Type_User.ADMIN:
        await this.prismaService.administrateur.update({
          where: {
            id_admin: userId,
          },
          data: {},
        });
        break;

      case Type_User.ARTISAN:
        await this.prismaService.artisan.update({
          where: {
            id_artisan: userId,
          },
          data: {
            annee_experience,
            description,
            specialite,
            statutCompte,
          },
        });
        break;

      case Type_User.FOURNISSEUR:
        await this.prismaService.fournisseur.update({
          where: {
            id_fournisseur: userId,
          },
          data: {
            specialite,
            statutCompte,
          },
        });
        break;

      case Type_User.CLIENT:
        await this.prismaService.client.update({
          where: {
            id_client: userId,
          },
          data: {
            preference_art,
          },
        });
        break;

      default:
        break;
    }
    return await this.prismaService.utilisateur.update({
      where: {
        id_utilisateur: userId,
      },
      data: {
        email: email?.toLowerCase().trim(),
        ...rest,
      },
      select: {
        ...utilisateurSelect,
        Administrateur: true,
        Artisan: true,
        Fournisseur: true,
        Client: true,
      },
    });
  }
}
