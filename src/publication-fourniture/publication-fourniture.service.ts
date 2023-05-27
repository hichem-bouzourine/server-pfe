import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePublicationFournitureDto } from './dto/create-publication-fourniture.dto';
import { UpdatePublicationFournitureDto } from './dto/update-publication-fourniture.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CategorieFournitureService } from '../categorie-fourniture/categorie-fourniture.service';

@Injectable()
export class PublicationFournitureService {
  constructor(
    private prismaService: PrismaService,
    private categorieFourniture: CategorieFournitureService,
  ) {}

  async create(
    id_fournisseur: number,
    type: string,
    createPublicationFournitureDto: CreatePublicationFournitureDto,
  ) {
    if (type !== 'FOURNISSEUR') {
      throw new UnauthorizedException(
        'You are not an Fournisseur to create a Publication-fourniture',
      );
    }
    const { id_fourniture } = createPublicationFournitureDto;

    await this.categorieFourniture.findOne(id_fourniture);

    const publication =
      await this.prismaService.publicationFourniture.findUnique({
        where: {
          id_fournisseur_id_fourniture: {
            id_fournisseur,
            id_fourniture,
          },
        },
      });

    if (publication) {
      throw new NotFoundException(
        `Publication for ${id_fournisseur} already exist`,
      );
    }

    const newPublication =
      await this.prismaService.publicationFourniture.create({
        data: {
          ...createPublicationFournitureDto,
          id_fournisseur,
        },
      });

    return newPublication;
  }

  async findAll() {
    const publications =
      await this.prismaService.publicationFourniture.findMany({});

    if (!publications.length) {
      throw new NotFoundException(`no publication found`);
    }

    return publications;
  }

  async findOne(id_fournisseur: number, id_fourniture: number) {
    const publication =
      await this.prismaService.publicationFourniture.findUnique({
        where: {
          id_fournisseur_id_fourniture: {
            id_fournisseur,
            id_fourniture,
          },
        },
      });

    if (!publication) {
      throw new NotFoundException(`Publication not found`);
    }

    return publication;
  }

  async findManyByIDFournisseur(id_fournisseur: number) {
    const publications =
      await this.prismaService.publicationFourniture.findMany({
        where: {
          id_fournisseur,
        },
      });

    if (!publications.length) {
      throw new NotFoundException(
        `no publication found for fournisseur with ID ${id_fournisseur}`,
      );
    }

    return publications;
  }

  async update(
    id_utilisateur: number,
    id_fourniture: number,
    updatePublicationFournitureDto: UpdatePublicationFournitureDto,
  ) {
    const publication =
      await this.prismaService.publicationFourniture.findUnique({
        where: {
          id_fournisseur_id_fourniture: {
            id_fournisseur: id_utilisateur,
            id_fourniture,
          },
        },
      });

    if (!publication) {
      throw new NotFoundException(`publication not found`);
    }

    const updatedPublication =
      await this.prismaService.publicationFourniture.update({
        where: {
          id_fournisseur_id_fourniture: {
            id_fournisseur: id_utilisateur,
            id_fourniture,
          },
        },
        data: {
          ...updatePublicationFournitureDto,
        },
      });
    return updatedPublication;
  }

  async remove(id_utilisateur: number, id_fourniture: number) {
    const publication =
      await this.prismaService.publicationFourniture.findUnique({
        where: {
          id_fournisseur_id_fourniture: {
            id_fournisseur: id_utilisateur,
            id_fourniture,
          },
        },
      });

    if (!publication) {
      throw new NotFoundException(`Publication not exist.`);
    }

    return await this.prismaService.publicationFourniture.delete({
      where: {
        id_fournisseur_id_fourniture: {
          id_fournisseur: id_utilisateur,
          id_fourniture,
        },
      },
    });
  }
}
