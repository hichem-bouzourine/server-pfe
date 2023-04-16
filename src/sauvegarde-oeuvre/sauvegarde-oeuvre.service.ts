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

  async create(id_client: number, id_oeuvre: number) {
    await this.oeuvreService.findOne(id_oeuvre);

    const existingSavedOeuvre = await this.prismaService.sauvegarde.findUnique({
      where: { id_client_id_oeuvre: { id_client, id_oeuvre } },
    });

    if (existingSavedOeuvre) {
      throw new ConflictException(
        `User with ID: ${id_client} already saved oeuvre with ID: ${id_oeuvre} `,
      );
    }

    const savedOeuvre = await this.prismaService.sauvegarde.create({
      data: {
        id_oeuvre,
        id_client,
      },
    });

    return savedOeuvre;
  }

  async findAllSavedOeuvreForClient(id_client: number) {
    const savedOeuvres = await this.prismaService.sauvegarde.findMany({
      where: {
        id_client,
      },
    });

    if (!savedOeuvres.length) {
      throw new NotFoundException(
        `User with id ${id_client} is not saving an Oeuvre`,
      );
    }

    return savedOeuvres;
  }

  async checkIfOeuvreIsSaved(
    id_client: number,
    id_oeuvre: number,
  ): Promise<boolean> {
    // Check the existance of the specified Oeuvre
    await this.oeuvreService.findOne(id_oeuvre);

    const existingSavedOeuvre = await this.prismaService.sauvegarde.findUnique({
      where: {
        id_client_id_oeuvre: {
          id_client,
          id_oeuvre,
        },
      },
    });

    return existingSavedOeuvre ? true : false;
  }

  async remove(id_client: number, id_oeuvre: number) {
    await this.oeuvreService.findOne(id_oeuvre);

    const existingSavedOeuvre = await this.prismaService.sauvegarde.findUnique({
      where: { id_client_id_oeuvre: { id_client, id_oeuvre } },
    });

    if (!existingSavedOeuvre) {
      throw new NotFoundException(
        `User with ID: ${id_client} is not saving oeuvre with ID ${id_oeuvre} `,
      );
    }

    const deletedSavedOeuvre = await this.prismaService.sauvegarde.delete({
      where: {
        id_client_id_oeuvre: {
          id_client,
          id_oeuvre,
        },
      },
    });

    return deletedSavedOeuvre;
  }
}
