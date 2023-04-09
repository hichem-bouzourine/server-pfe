import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignalementProfileDto } from './dto/create-signalement-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SignalementProfileService {
  constructor(private prismaService: PrismaService) {}

  async create(createSignalementProfileDto: CreateSignalementProfileDto) {
    const signale = await this.prismaService.utilisateur.findUnique({
      where: { id_utilisateur: createSignalementProfileDto.id_signale },
    });

    if (!signale) {
      throw new NotFoundException('Utilisateur signalé not found.');
    }

    const rapporteur = await this.prismaService.utilisateur.findUnique({
      where: { id_utilisateur: createSignalementProfileDto.id_rapporteur },
    });

    if (!rapporteur) {
      throw new NotFoundException('Utilisateur rapporteur not found.');
    }

    const signalement = await this.prismaService.signalementProfil.create({
      data: {
        ...createSignalementProfileDto,
        etatSignalement: false,
      },
    });

    return signalement;
  }

  async findAll() {
    const signalements = await this.prismaService.signalementProfil.findMany();

    if (!signalements) throw new NotFoundException('No signalement found.');

    return signalements;
  }

  async approveSignale(id_utilisateur: number, id: number) {
    const signalement = await this.prismaService.signalementProfil.findUnique({
      where: { id_signalement: id },
    });

    if (!signalement)
      throw new NotFoundException(`Signalement with id ${id} not found.`);

    const signalementApprove =
      await this.prismaService.signalementProfil.update({
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
