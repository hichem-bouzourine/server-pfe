import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { signToken } from 'src/utils/signtoken.jwt';
import { UpdateUserDto } from './dtos/update-user-.dto';
import { Type_User } from '@prisma/client';
import { utilisateurSelect } from 'src/types/utilisateur-select';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Logs in a user with the provided email and password.
   *
   * @throws {NotFoundException} If no user is found with the provided email.
   * @throws {BadRequestException} If the password is incorrect.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   *
   * @returns {Promise<{ user: Utilisateur, token: string }>} An object containing the authenticated user and the access token.
   */

  async login(email: string, password: string) {
    // find user by email
    const userByEmail = await this.prismaService.utilisateur.findFirst({
      where: {
        email,
      },
    });

    if (!userByEmail) throw new NotFoundException('user not found');

    const [salt, hash] = userByEmail.password.split('.');

    const pass = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = pass.toString('hex');

    if (hashedPassword !== hash)
      throw new BadRequestException('Incorrect password');

    // Generate the token
    const { password: storedPassword, ...rest } = userByEmail;
    const token = await signToken(rest.id_utilisateur, email, rest.type);

    return {
      user: rest,
      token,
    };
  }

  /**
   * Updates properties of Current connected user
   * @param id_utilisateur
   * @param body
   * @returns Utilisateur
   *
   * @example updateUser(12, CLIENT, {nom: "hichem"}) => Utilisateur
   */
  async update(id_utilisateur: number, type: string, body: UpdateUserDto) {
    const {
      preference_art,
      annee_debut_experience,
      description,
      specialite,
      statutCompte,
      raison_social,
      email,
      ...rest
    } = body;

    switch (type) {
      case Type_User.ADMIN:
        await this.prismaService.administrateur.update({
          where: {
            id_admin: id_utilisateur,
          },
          data: {},
        });
        break;

      case Type_User.ARTISAN:
        try {
          await this.prismaService.artisan.update({
            where: {
              id_artisan: id_utilisateur,
            },
            data: {
              annee_debut_experience,
              description,
              specialite,
              statutCompte,
            },
          });
        } catch (error) {
          throw new BadRequestException(
            `Spécialité with id ${specialite} doesn't exist.`,
          );
        }
        break;

      case Type_User.FOURNISSEUR:
        await this.prismaService.fournisseur.update({
          where: {
            id_fournisseur: id_utilisateur,
          },
          data: {
            raison_social,
            statutCompte,
          },
        });
        break;

      case Type_User.CLIENT:
        try {
          await this.prismaService.client.update({
            where: {
              id_client: id_utilisateur,
            },
            data: {
              preference_art,
            },
          });
        } catch (error) {
          throw new BadRequestException(
            `preference art with id ${preference_art} doesn't exist.`,
          );
        }
        break;

      default:
        break;
    }

    return await this.prismaService.utilisateur.update({
      where: {
        id_utilisateur,
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
