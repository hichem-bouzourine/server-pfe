import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsulteOeuvreService {
  constructor(private prismaService: PrismaService) {}

  async create(id_client: number, id_oeuvre: number) {
    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre },
    });

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with id ${id_oeuvre} not found.`);
    }

    const existingConsulteOeuvre =
      await this.prismaService.consulteOeuvre.findUnique({
        where: { id_client_id_oeuvre: { id_client, id_oeuvre } },
      });

    if (existingConsulteOeuvre) return;

    const ConsulteOeuvre = await this.prismaService.consulteOeuvre.create({
      data: {
        id_client,
        id_oeuvre,
      },
    });

    return ConsulteOeuvre;
  }

  async findAllConsultesForOeuvre(id_oeuvre: number) {
    const ConsultesOeuvre = await this.prismaService.consulteOeuvre.findMany({
      where: {
        id_oeuvre,
      },
    });

    return ConsultesOeuvre;
  }

  async findAllOeuvresConsulteParClient(id_client: number) {
    const ConsultesOeuvre = await this.prismaService.consulteOeuvre.findMany({
      where: {
        id_client,
      },
    });

    return ConsultesOeuvre;
  }
}
