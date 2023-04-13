import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Oeuvre } from '@prisma/client';
import { CreateOeuvreDto } from './dtos/create-oeuvre.dto';
import { UpdateOeuvreDto } from './dtos/update-oeuvre.dto';
import { CategorieService } from 'src/categorie/categorie.service';

@Injectable()
export class OeuvreService {
  constructor(
    private prismaService: PrismaService,
    private categorieService: CategorieService,
  ) {}
  /**
   * Retrieves all oeuvres
   * @returns {Promise<Oeuvre[]>} Promise containing all oeuvres
   * @throws {NotFoundException} if no oeuvres are found
   * @throws {InternalServerErrorException} if there's an error while fetching categories
   */
  async findAll(): Promise<Oeuvre[]> {
    const oeuvres = await this.prismaService.oeuvre.findMany();

    if (!oeuvres.length) {
      throw new NotFoundException('No oeuvres.');
    }

    return oeuvres;
  }

  /**
   * Find a oeuvre by its ID
   *
   * @param id - ID of the oeuvre to find
   * @returns The found oeuvre
   * @throws NotFoundException if no oeuvre with the provided ID was found
   */
  async findOne(id: number) {
    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre: id },
    });

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with ID '${id}' not found.`);
    }

    return oeuvre;
  }

  /**
   * Find 1 categorie by `titre_oeuvre`
   * @param {string} titre_oeuvre - The name of the oeuvre to search for
   * @returns The found oeuvre, or NotFoundException if none were found
   */
  async findByTitreOeuvre(titre_oeuvre: string): Promise<Oeuvre> {
    const oeuvre = await this.prismaService.oeuvre.findFirst({
      where: {
        titre_oeuvre: {
          contains: titre_oeuvre,
          mode: 'insensitive',
        },
      },
    });

    if (!oeuvre) {
      throw new NotFoundException(
        `No oeuvre found with titre_oeuvre: ${titre_oeuvre}`,
      );
    }

    return oeuvre;
  }

  /**
   * Creates a new oeuvre.
   *
   * @param {CreateOeuvreDto} createOeuvreDto The DTO containing the data to create the oeuvre.
   *
   * @returns {Promise<Oeuvre>} The created oeuvre.
   *
   * @throws {InternalServerErrorException} If the oeuvre couldn't be created.
   */
  async create(
    userId: number,
    type: string,
    createOeuvreDto: CreateOeuvreDto,
  ): Promise<Oeuvre> {
    // check if the user is an Artist
    if (type !== 'ARTISAN') {
      throw new UnauthorizedException(
        'You are not an Artist to create an Oeuvre',
      );
    }

    const { date_publication, date_realisation, id_categorie, ...rest } =
      createOeuvreDto;

    // check if `id_categorie` is a categorie
    await this.categorieService.findOne(id_categorie);

    const oeuvre = await this.prismaService.oeuvre.create({
      data: {
        id_artisan: userId,
        date_publication: new Date(date_publication),
        date_realisation: new Date(date_realisation),
        id_categorie,
        ...rest,
      },
    });
    return oeuvre;
  }

  /**  Updates a oeuvre by ID
   * @param {number} oeuvreId - The ID of the oeuvre to be updated
   * @param {UpdateOeuvreDto} updateOeuvreDto - The updated information of the oeuvre
   * @returns {Promise<Oeuvre>} - The updated oeuvre
   * @throws {NotFoundException} - If no oeuvre was found with the given ID
   */
  async update(
    userId: number,
    oeuvreId: number,
    updateOeuvreDto: UpdateOeuvreDto,
  ): Promise<Oeuvre> {
    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre: oeuvreId },
    });
    console.log(oeuvre);

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with ID ${oeuvreId} not found`);
    }

    if (oeuvre.id_artisan !== userId) {
      throw new UnauthorizedException(
        `You are not authorized to update this oeuvre`,
      );
    }

    const updatedOeuvre = await this.prismaService.oeuvre.update({
      where: { id_oeuvre: oeuvreId },
      data: updateOeuvreDto,
    });
    return updatedOeuvre;
  }

  /**
   * Deletes a oeuvre by ID
   * @param {number} id_oeuvre - The Id of the oeuvre to be deleted
   * @returns {Promise<Oeuvre>} - The deleted oeuvre
   * @throws {NotFoundException} - If no oeuvre was found with the given ID
   * @throws {InternalServerErrorException} If the oeuvre couldn't be deleted.
   */
  async remove(userId: number, id_oeuvre: number): Promise<Oeuvre> {
    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre },
    });

    if (!oeuvre) {
      throw new NotFoundException(
        `Oeuvre with ID ${id_oeuvre} does not exist.`,
      );
    }

    if (oeuvre.id_artisan !== userId) {
      throw new ForbiddenException(
        `You are not authorized to delete this oeuvre.`,
      );
    }

    return await this.prismaService.oeuvre.delete({
      where: { id_oeuvre },
    });
  }
}