import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMateriauDto } from './dtos/create-materiau.dto';
import { UpdateMateriauDto } from './dtos/update-materiau.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Materiau } from '@prisma/client';

@Injectable()
export class MateriauService {
  constructor(private prismaService: PrismaService) {}

  async create(createMateriauDto: CreateMateriauDto) {
    const { nom } = createMateriauDto;
    const existingMateriau = await this.prismaService.materiau.findFirst({
      where: {
        nom: {
          equals: nom,
        },
      },
    });

    if (existingMateriau) {
      throw new BadRequestException(`Materiau with name ${nom} already exists`);
    }

    const newMateriau = await this.prismaService.materiau.create({
      data: {
        nom: nom,
      },
    });

    return newMateriau;
  }

  async findAll() {
    const materiaux = await this.prismaService.materiau.findMany();

    if (!materiaux.length) {
      throw new NotFoundException(`No Materiau found`);
    }

    return materiaux;
  }

  async findOne(id: number) {
    const materiau = await this.prismaService.materiau.findUnique({
      where: {
        id,
      },
    });

    if (!materiau) {
      throw new NotFoundException(`No Materiau found`);
    }

    return materiau;
  }

  async findByNomMateriau(nom: string): Promise<Materiau[]> {
    const materiaux = await this.prismaService.materiau.findMany({
      where: {
        nom: {
          contains: nom,
          mode: 'insensitive', // case-insensitive search
        },
      },
    });

    if (!materiaux.length) {
      throw new NotFoundException(`No materiaux found with nom: ${nom}`);
    }

    return materiaux;
  }

  async update(id: number, updateMateriauDto: UpdateMateriauDto) {
    await this.findOne(id);

    const { nom } = updateMateriauDto;

    const updatedMateriau = await this.prismaService.materiau.update({
      where: {
        id,
      },
      data: {
        nom,
      },
    });

    return updatedMateriau;
  }

  async remove(id: number) {
    await this.findOne(id);

    const deletedMateriau = await this.prismaService.materiau.delete({
      where: {
        id,
      },
    });

    return deletedMateriau;
  }
}
