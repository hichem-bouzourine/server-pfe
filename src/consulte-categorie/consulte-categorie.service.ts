import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsulteCategorieService {
  constructor(private prismaService: PrismaService) {}

  async create(id_client: number, id_categorie: number) {
    const categorie = await this.prismaService.categorie.findUnique({
      where: { id_categorie },
    });

    if (!categorie) {
      throw new NotFoundException(
        `Categorie with id ${id_categorie} not found.`,
      );
    }

    const existingConsulteCategorie =
      await this.prismaService.consulteCategorie.findUnique({
        where: { id_client_id_categorie: { id_categorie, id_client } },
      });

    if (existingConsulteCategorie) return;

    const ConsulteCategorie = await this.prismaService.consulteCategorie.create(
      {
        data: {
          id_client,
          id_categorie,
        },
      },
    );

    return ConsulteCategorie;
  }

  async findAllConsultesForCategorie(id_categorie: number) {
    const ConsultesCategorie =
      await this.prismaService.consulteCategorie.findMany({
        where: {
          id_categorie,
        },
      });

    return ConsultesCategorie;
  }

  async findAllCategoriesConsulteParClient(id_client: number) {
    const ConsultesCategorie =
      await this.prismaService.consulteCategorie.findMany({
        where: {
          id_client,
        },
      });

    return ConsultesCategorie;
  }
}
