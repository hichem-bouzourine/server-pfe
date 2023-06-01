import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTechniqueDto } from './dtos/create-technique.dto';
import { UpdateTechniqueDto } from './dtos/update-technique.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TechniqueService {
  constructor(private prismaService: PrismaService) {}

  async create(createTechniqueDto: CreateTechniqueDto) {
    const { nom } = createTechniqueDto;
    const existingTechnique = await this.prismaService.technique.findFirst({
      where: {
        nom: {
          equals: nom,
        },
      },
    });

    if (existingTechnique) {
      throw new BadRequestException(
        `Technique with name ${nom} already exists`,
      );
    }

    const newTechnique = await this.prismaService.technique.create({
      data: {
        nom: nom,
      },
    });

    return newTechnique;
  }

  async findAll() {
    const techniques = await this.prismaService.technique.findMany();

    if (!techniques.length) {
      throw new NotFoundException(`No technique found`);
    }

    return techniques;
  }

  async findOne(id: number) {
    const technique = await this.prismaService.technique.findUnique({
      where: {
        id,
      },
    });

    if (!technique) {
      throw new NotFoundException(`No technique found`);
    }

    return technique;
  }

  async update(id: number, updateTechniqueDto: UpdateTechniqueDto) {
    await this.findOne(id);

    const { nom } = updateTechniqueDto;

    const updatedTechnique = await this.prismaService.technique.update({
      where: {
        id,
      },
      data: {
        nom,
      },
    });

    return updatedTechnique;
  }

  async remove(id: number) {
    await this.findOne(id);

    const deletedTechnique = await this.prismaService.technique.delete({
      where: {
        id,
      },
    });

    return deletedTechnique;
  }
}
