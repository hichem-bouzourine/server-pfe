import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Categorie } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategorieService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Retrieves all categories
   * @returns {Promise<Categorie[]>} Promise containing all categories
   * @throws {NotFoundException} if no categories are found
   * @throws {InternalServerErrorException} if there's an error while fetching categories
   */
  async findAll(): Promise<Categorie[]> {
    const categories = await this.prismaService.categorie.findMany({});

    if (!categories.length) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }

  /**
   * Find a categorie by its ID
   *
   * @param id - ID of the categorie to find
   * @returns The found categorie
   * @throws NotFoundException if no categorie with the provided ID was found
   */
  async findOne(id: number): Promise<Categorie> {
    const categorie = await this.prismaService.categorie.findUnique({
      where: { id_categorie: id },
    });

    if (!categorie) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }

    return categorie;
  }

  /**
   * Find 1 categorie by nom_categorie
   * @param nom_categorie The name of the category to search for
   * @returns The found categorie, or NotFoundException if none were found
   */
  async findByNomCategorie(nom_categorie: string): Promise<Categorie> {
    const categorie = await this.prismaService.categorie.findFirst({
      where: {
        nom_categorie: {
          contains: nom_categorie,
          mode: 'insensitive', // case-insensitive search
        },
      },
    });

    if (!categorie) {
      throw new NotFoundException(
        `No categories found with nom_categorie: ${nom_categorie}`,
      );
    }

    return categorie;
  }

  /**
   * Creates a new categorie.
   *
   * @param {CreateCategorieDto} createCategorieDto The DTO containing the data to create the categorie.
   *
   * @returns {Promise<Categorie>} The created categorie.
   *
   * @throws {InternalServerErrorException} If the categorie couldn't be created.
   */
  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    const { nom_categorie, image_categorie, description } = createCategorieDto;

    const existingCategorie = await this.prismaService.categorie.findFirst({
      where: {
        nom_categorie: {
          contains: nom_categorie,
          mode: 'insensitive', // case-insensitive search
        },
      },
    });

    if (existingCategorie) {
      throw new BadRequestException(
        `categorie with name ${nom_categorie} already exists`,
      );
    }

    const categorie = await this.prismaService.categorie.create({
      data: {
        nom_categorie,
        image_categorie,
        description,
      },
    });

    if (!categorie) {
      throw new InternalServerErrorException('Failed to create categorie');
    }

    return categorie;
  }

  /**  Updates a categorie by ID
   * @param {number} id_categorie - The ID of the categorie to be updated
   * @param {UpdateCategorieDto} updateCategorieDto - The updated information of the categorie
   * @returns {Promise<Categorie>} - The updated categorie
   * @throws {NotFoundException} - If no categorie was found with the given ID
   */
  async update(
    id_categorie: number,
    updateCategorieDto: UpdateCategorieDto,
  ): Promise<Categorie> {
    await this.findOne(id_categorie);

    const newCategorie = await this.prismaService.categorie.update({
      where: {
        id_categorie: id_categorie,
      },
      data: updateCategorieDto,
    });

    return newCategorie;
  }

  /**
   * Deletes a categorie by ID
   * @param {number} id_categorie - The Id of the categorie to be deleted
   * @returns {Promise<Categorie>} - The deleted categorie
   * @throws {NotFoundException} - If no categorie was found with the given ID
   * @throws {InternalServerErrorException} If the categorie couldn't be deleted.
   */
  async remove(id_categorie: number): Promise<Categorie> {
    await this.findOne(id_categorie);

    const deletedCategorie = await this.prismaService.categorie.delete({
      where: { id_categorie: id_categorie },
    });

    return deletedCategorie;
  }
}
