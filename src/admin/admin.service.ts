import {
  BadGatewayException,
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
import { AdresseService } from '../adresse/adresse.service';

@Injectable()
export class AdminService {
  constructor(
    private prismaService: PrismaService,
    private adresseService: AdresseService,
  ) {}

  async createAdmin(body: CreateAdminDto) {
    const {
      date_de_naissance,
      date_inscription,
      password,
      email,
      id_Commune,
      Rue,
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

    // Create Adresse and get its ID
    const adresse = await this.adresseService.createAdresse({
      id_Commune,
      Rue,
    });

    const { id: id_adresse } = adresse;

    const user = await this.prismaService.utilisateur.create({
      data: {
        ...userData,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        id_adresse,
        date_de_naissance: new Date(date_de_naissance),
        date_inscription: new Date(),
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
   * Get user by its ID
   * @param id
   * @returns Utilisateur
   */
  async getOneUserById(id: number) {
    const user = await this.prismaService.utilisateur.findUnique({
      where: {
        id_utilisateur: id,
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
      document,
      annee_debut_experience,
      description,
      specialite,
      raison_social,
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
            annee_debut_experience,
            description,
            specialite,
            statutCompte,
            document,
          },
        });
        break;

      case Type_User.FOURNISSEUR:
        await this.prismaService.fournisseur.update({
          where: {
            id_fournisseur: userId,
          },
          data: {
            raison_social,
            statutCompte,
            document,
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

  /**
   * Deletes a user and all their associated data from the database.
   * @async
   * @function deleteUser
   * @param {number} userId - The ID of the user to delete.
   * @throws {NotFoundException} If the user cannot be found in the database.
   * @throws {BadGatewayException} If deleting the user and their data from the database fails.
   * @returns {Promise<void>} A Promise that resolves when the user and their data have been successfully deleted.
   */
  async deleteUser(userId: number) {
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

    switch (user.type) {
      case Type_User.ADMIN:
        await this.prismaService.administrateur.delete({
          where: {
            id_admin: user.Administrateur.id_admin,
          },
        });
        break;

      case Type_User.ARTISAN:
        await this.prismaService.artisan.delete({
          where: {
            id_artisan: user.Artisan.id_artisan,
          },
        });
        break;

      case Type_User.FOURNISSEUR:
        await this.prismaService.fournisseur.delete({
          where: {
            id_fournisseur: user.Fournisseur.id_fournisseur,
          },
        });
        break;

      case Type_User.CLIENT:
        await this.prismaService.client.delete({
          where: {
            id_client: user.Client.id_client,
          },
        });
        break;

      default:
        break;
    }

    const deletedUser = this.prismaService.utilisateur.delete({
      where: {
        id_utilisateur: userId,
      },
    });

    if (!deletedUser) {
      throw new BadGatewayException('Failed to delete user');
    }

    return deletedUser;
  }

  async deleteOeuvre(id_oeuvre: number) {
    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: {
        id_oeuvre,
      },
    });

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with ID ${id_oeuvre} not found`);
    }

    const deletedOeuvre = await this.prismaService.oeuvre.delete({
      where: {
        id_oeuvre,
      },
    });

    return deletedOeuvre;
  }

  async getOeuvresStats() {
    return await this.prismaService.oeuvre.count();
  }

  async getCategoriesStats() {
    return await this.prismaService.categorie.count();
  }

  async getUsersStats() {
    return await this.prismaService.utilisateur.count();
  }

  async getUsersPerTypeStats() {
    const response = (await this.prismaService
      .$queryRaw`SELECT COUNT(*), "type" FROM "Utilisateur" GROUP BY "type"`) as {
      type: string;
      count: number;
    }[];

    const result = response.map((row) => {
      return {
        type: row.type,
        count: Number(row.count),
      };
    });

    return result;
  }

  async getTotalSignalementsTraite() {
    const signalementsProfileTraite =
      await this.prismaService.signalementProfil.findMany({
        where: {
          etatSignalement: true,
        },
      });

    const signalementsOeuvreTraite =
      await this.prismaService.signalementOeuvre.findMany({
        where: {
          etatSignalement: true,
        },
      });

    const signalementsAvisTraite =
      await this.prismaService.signalementAvis.findMany({
        where: {
          etatSignalement: true,
        },
      });

    const count =
      signalementsProfileTraite.length +
      signalementsOeuvreTraite.length +
      signalementsAvisTraite.length;

    return count;
  }

  async getTotalSignalementsNonTraite() {
    const signalementsProfileTraite =
      await this.prismaService.signalementProfil.findMany({
        where: {
          etatSignalement: false,
        },
      });

    const signalementsOeuvreTraite =
      await this.prismaService.signalementOeuvre.findMany({
        where: {
          etatSignalement: false,
        },
      });

    const signalementsAvisTraite =
      await this.prismaService.signalementAvis.findMany({
        where: {
          etatSignalement: false,
        },
      });

    const count =
      signalementsProfileTraite.length +
      signalementsOeuvreTraite.length +
      signalementsAvisTraite.length;

    return count;
  }

  async getUsersCountByMonth() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const response = (await this.prismaService.$queryRaw`
      SELECT trim(to_char(date_inscription, 'Month')) AS month, COUNT(*) AS count
      FROM "Utilisateur"
      GROUP BY month
    `) as {
      month: string;
      count: number;
    }[];

    const countByMonth = {};
    response.forEach(({ month, count }) => {
      countByMonth[month] = Number(count);
    });

    const result = months.map((month) => ({
      x: month,
      y: countByMonth[month] || 0,
    }));

    return result;
  }
}
