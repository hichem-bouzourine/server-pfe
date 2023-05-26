import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvisDto } from './dto/create-avis.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ClientService } from '../client/client.service';
import { OeuvreService } from '../oeuvre/oeuvre.service';

@Injectable()
export class AvisService {
  constructor(
    private prismaService: PrismaService,
    private clientService: ClientService,
    private oeuvreService: OeuvreService,
  ) {}

  async create(createAvisDto: CreateAvisDto) {
    const user = await this.prismaService.utilisateur.findUnique({
      where: {
        id_utilisateur: createAvisDto.id_utilisateur,
      },
    });

    if (!user)
      throw new NotFoundException(
        `User with id '${createAvisDto.id_utilisateur}' not found`,
      );

    await this.oeuvreService.findOne(createAvisDto.id_oeuvre);

    const avis = await this.prismaService.avis.create({
      data: {
        ...createAvisDto,
      },
    });

    return avis;
  }

  async findAllForOeuvre(id_oeuvre: number) {
    await this.oeuvreService.findOne(id_oeuvre);

    const avis = await this.prismaService.avis.findMany({
      where: {
        id_oeuvre,
      },
    });

    if (!avis.length) {
      throw new NotFoundException('No avis found for this oeuvre');
    }

    return avis;
  }

  async findOne(id_avis: number) {
    const avis = await this.prismaService.avis.findUnique({
      where: { id_avis },
    });

    if (!avis)
      throw new NotFoundException(`Avis with id ${id_avis} not found.`);

    return avis;
  }

  async remove(id_avis: number) {
    const avis = await this.findOne(id_avis);

    const deletedAvis = await this.prismaService.avis.delete({
      where: { id_avis },
    });

    return deletedAvis;
  }
}
