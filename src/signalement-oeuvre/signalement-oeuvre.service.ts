import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignalementOeuvreDto } from './dto/create-signalement-oeuvre.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SignalementOeuvreService {
  constructor(private prismaService: PrismaService) {}

  async create(createSignalementOeuvreDto: CreateSignalementOeuvreDto) {
    const client = await this.prismaService.client.findUnique({
      where: { id_client: createSignalementOeuvreDto.id_client },
    });

    if (!client) {
      throw new NotFoundException('Client not found.');
    }

    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre: createSignalementOeuvreDto.id_oeuvre },
    });

    if (!oeuvre) {
      throw new NotFoundException('Oeuvre not found.');
    }

    const signalement = await this.prismaService.signalementOeuvre.create({
      data: {
        ...createSignalementOeuvreDto,
        etatSignalement: false,
      },
    });

    return signalement;
  }

  async findAll() {
    const signalements = await this.prismaService.signalementOeuvre.findMany();

    if (!signalements) throw new NotFoundException('No signalement found.');

    return signalements;
  }

  async approveSignale(id_utilisateur: number, id: number) {
    const signalement = await this.prismaService.signalementOeuvre.findUnique({
      where: { id_signalement: id },
    });

    if (!signalement)
      throw new NotFoundException(`Signalement with id ${id} not found.`);

    const signalementApprove =
      await this.prismaService.signalementOeuvre.update({
        where: {
          id_signalement: id,
        },
        data: {
          etatSignalement: true,
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
