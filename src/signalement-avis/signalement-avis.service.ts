import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignalementAvisDto } from './dto/create-signalement-avis.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SignalementAvisService {
  constructor(private prismaService: PrismaService) {}

  async create(createSignalementAvisDto: CreateSignalementAvisDto) {
    const client = await this.prismaService.client.findUnique({
      where: { id_client: createSignalementAvisDto.id_client },
    });

    if (!client) {
      throw new NotFoundException('Client not found.');
    }

    const Avis = await this.prismaService.avis.findUnique({
      where: { id_avis: createSignalementAvisDto.id_avis },
    });

    if (!Avis) {
      throw new NotFoundException('Avis not found.');
    }

    const signalement = await this.prismaService.signalementAvis.create({
      data: {
        ...createSignalementAvisDto,
        etatSignalement: false,
      },
    });

    return signalement;
  }

  async findAll() {
    const signalements = await this.prismaService.signalementAvis.findMany();

    if (!signalements.length)
      throw new NotFoundException('No signalement found.');

    return signalements;
  }

  async traiteSignale(id_utilisateur: number, id: number, resultat: boolean) {
    const signalement = await this.prismaService.signalementAvis.findUnique({
      where: { id_signalement: id },
    });

    if (!signalement)
      throw new NotFoundException(`Signalement with id ${id} not found.`);

    const signalementApprove = await this.prismaService.signalementAvis.update({
      where: {
        id_signalement: id,
      },
      data: {
        etatSignalement: true,
        resultat,
        Administrateur: {
          connect: {
            id_admin: id_utilisateur,
          },
        },
      },
    });

    return signalementApprove;
  }
}
