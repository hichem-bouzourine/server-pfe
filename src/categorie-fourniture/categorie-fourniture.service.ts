import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategorieFournitureDto } from './dto/create-categorie-fourniture.dto';
import { UpdateCategorieFournitureDto } from './dto/update-categorie-fourniture.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategorieFournitureService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategorieFournitureDto: CreateCategorieFournitureDto) {
    const { nom_fourniture, photo } = createCategorieFournitureDto;

    const existingCategorie =
      await this.prismaService.categorieFourniture.findFirst({
        where: {
          nom_fourniture: {
            equals: nom_fourniture,
            mode: 'insensitive',
          },
        },
      });

    if (existingCategorie) {
      throw new BadRequestException(
        `Fourniture with name ${nom_fourniture} already exists`,
      );
    }

    const fourniture = await this.prismaService.categorieFourniture.create({
      data: {
        nom_fourniture,
        photo,
      },
    });

    if (!fourniture) {
      throw new InternalServerErrorException('Failed to create fourniture');
    }

    return fourniture;
  }

  async findAll() {
    const fournitures = await this.prismaService.categorieFourniture.findMany(
      {},
    );

    if (!fournitures.length) {
      throw new NotFoundException('No fournitures found');
    }

    return fournitures;
  }

  async findOne(id_fourniture: number) {
    const fourniture = await this.prismaService.categorieFourniture.findUnique({
      where: { id_fourniture },
    });

    if (!fourniture) {
      throw new NotFoundException(
        `fourniture with ID ${id_fourniture} not found`,
      );
    }

    return fourniture;
  }

  async findByNomFourniture(nom_fourniture: string) {
    const fourniture = await this.prismaService.categorieFourniture.findMany({
      where: {
        nom_fourniture: {
          contains: nom_fourniture,
          mode: 'insensitive', // case-insensitive search
        },
      },
    });

    if (!fourniture.length) {
      throw new NotFoundException(
        `No categories found with nom_categorie: ${nom_fourniture}`,
      );
    }

    return fourniture;
  }

  async getPublicationsByIDFourniture(id_fourniture: number) {
    const publications =
      await this.prismaService.categorieFourniture.findUnique({
        where: { id_fourniture },
        include: {
          PublicationFournitures: {},
        },
      });

    if (!publications) {
      throw new NotFoundException(
        `Publication for fourniture with ID ${id_fourniture} not found`,
      );
    }

    return publications;
  }

  async findPublicationsByNomFournitures(nom_fourniture: string) {
    const publications = await this.prismaService.categorieFourniture.findMany({
      where: {
        nom_fourniture: {
          contains: nom_fourniture,
          mode: 'insensitive', // case-insensitive search
        },
      },
      include: {
        PublicationFournitures: {},
      },
    });

    if (!publications.length) {
      throw new NotFoundException(
        `No categories found with nom_categorie: ${nom_fourniture}`,
      );
    }

    return publications;
  }

  async update(
    id_fourniture: number,
    updateCategorieFournitureDto: UpdateCategorieFournitureDto,
  ) {
    await this.findOne(id_fourniture);

    const newfourniture = await this.prismaService.categorieFourniture.update({
      where: {
        id_fourniture,
      },
      data: updateCategorieFournitureDto,
    });

    return newfourniture;
  }

  async remove(id_fourniture: number) {
    await this.findOne(id_fourniture);

    const deletedCategorie =
      await this.prismaService.categorieFourniture.delete({
        where: { id_fourniture },
      });

    return deletedCategorie;
  }
}
