import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdresseService {
  constructor(private prismaService: PrismaService) {}

  async createAdresse(createAdresseDto: CreateAdresseDto) {
    const commune = await this.prismaService.commune.findUnique({
      where: {
        id: createAdresseDto.id_Commune,
      },
    });

    if (!commune) {
      throw new NotFoundException(
        `No Commune with id ${createAdresseDto.id_Commune} found.`,
      );
    }

    const adresse = await this.prismaService.adresse.create({
      data: createAdresseDto,
    });

    return adresse;
  }

  async findAllWilayas() {
    const wilayas = await this.prismaService.wilaya.findMany();

    if (!wilayas.length) {
      throw new NotFoundException('No wilaya found.');
    }

    return wilayas;
  }

  async findDairaByWilaya(id_wilaya: number) {
    const wilaya = await this.prismaService.wilaya.findUnique({
      where: { id: id_wilaya },
    });

    if (!wilaya) {
      throw new NotFoundException(`No wilaya with id ${id_wilaya} found.`);
    }

    const dairas = await this.prismaService.daira.findMany({
      where: {
        id_wilaya,
      },
    });

    if (!dairas.length) {
      throw new NotFoundException('No Daira found.');
    }

    return dairas;
  }

  async findCommuneByDaira(id_daira: number) {
    const daira = await this.prismaService.daira.findUnique({
      where: { id: id_daira },
    });

    if (!daira) {
      throw new NotFoundException(`No Daira with id ${id_daira} found.`);
    }

    const communes = await this.prismaService.commune.findMany({
      where: {
        id_daira,
      },
    });

    if (!communes.length) {
      throw new NotFoundException('No Commune found.');
    }

    return communes;
  }
}
