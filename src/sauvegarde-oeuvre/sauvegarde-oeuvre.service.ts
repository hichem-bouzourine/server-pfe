import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OeuvreService } from '../oeuvre/oeuvre.service';

@Injectable()
export class SauvegardeOeuvreService {
  constructor(
    private prismaService: PrismaService,
    private oeuvreService: OeuvreService,
  ) {}

  async create(id_utilisateur: number, id_oeuvre: number) {
    await this.oeuvreService.findOne(id_oeuvre);

    const existingSavedOeuvre = await this.prismaService.sauvegarde.findUnique({
      where: { id_utilisateur_id_oeuvre: { id_utilisateur, id_oeuvre } },
    });

    if (existingSavedOeuvre) {
      throw new ConflictException(
        `User with ID: ${id_utilisateur} already saved oeuvre with ID: ${id_oeuvre} `,
      );
    }

    const savedOeuvre = await this.prismaService.sauvegarde.create({
      data: {
        id_oeuvre,
        id_utilisateur,
      },
    });

    return savedOeuvre;
  }

  async findAllSavedOeuvreForUser(id_utilisateur: number) {
    const savedOeuvres = await this.prismaService.sauvegarde.findMany({
      where: {
        id_utilisateur,
      },
    });

    if (!savedOeuvres.length) {
      throw new NotFoundException(
        `User with id ${id_utilisateur} is not saving an Oeuvre`,
      );
    }

    return savedOeuvres;
  }

  async checkIfOeuvreIsSaved(
    id_utilisateur: number,
    id_oeuvre: number,
  ): Promise<boolean> {
    // Check the existance of the specified Oeuvre
    await this.oeuvreService.findOne(id_oeuvre);

    const existingSavedOeuvre = await this.prismaService.sauvegarde.findUnique({
      where: {
        id_utilisateur_id_oeuvre: {
          id_utilisateur,
          id_oeuvre,
        },
      },
    });

    return existingSavedOeuvre ? true : false;
  }

  async remove(id_utilisateur: number, id_oeuvre: number) {
    await this.oeuvreService.findOne(id_oeuvre);

    const existingSavedOeuvre = await this.prismaService.sauvegarde.findUnique({
      where: { id_utilisateur_id_oeuvre: { id_utilisateur, id_oeuvre } },
    });

    if (!existingSavedOeuvre) {
      throw new NotFoundException(
        `User with ID: ${id_utilisateur} is not saving oeuvre with ID ${id_oeuvre} `,
      );
    }

    const deletedSavedOeuvre = await this.prismaService.sauvegarde.delete({
      where: {
        id_utilisateur_id_oeuvre: {
          id_utilisateur,
          id_oeuvre,
        },
      },
    });

    return deletedSavedOeuvre;
  }
}
