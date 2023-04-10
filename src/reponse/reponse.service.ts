import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReponseDto } from './dto/create-reponse.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AvisService } from '../avis/avis.service';
import { OeuvreService } from '../oeuvre/oeuvre.service';

@Injectable()
export class ReponseService {
  constructor(
    private prismaService: PrismaService,
    private avisService: AvisService,
    private oeuvreService: OeuvreService,
  ) {}

  /**
   * Creates a response for a specific review and artisan
   *
   * @param {CreateReponseDto} createReponseDto DTO containing the information needed to create a response
   * @param {number} id_artisan ID of the artisan creating the response
   * @returns {Promise<object>} Returns the created response
   * @throws {BadRequestException} Throws if response for the review already exists
   * @throws {UnauthorizedException} Throws if the artisan is not the owner of the corresponding artwork
   */
  async create(createReponseDto: CreateReponseDto, id_artisan: number) {
    // Check if reponse for Avis already exists
    const existingReponse = await this.prismaService.reponse.findUnique({
      where: {
        id_artisan_id_avis: {
          id_artisan,
          id_avis: createReponseDto.id_avis,
        },
      },
    });

    if (existingReponse) {
      throw new BadRequestException(
        `Reponse for avis with ID ${createReponseDto.id_avis} already exist`,
      );
    }
    // Find the corresponding Avis and Oeuvre
    const avis = await this.avisService.findOne(createReponseDto.id_avis);

    const oeuvre = await this.oeuvreService.findOne(avis.id_oeuvre);

    if (id_artisan !== oeuvre.id_artisan) {
      throw new UnauthorizedException(
        `You are not allowed to reply, because you are not the owner of this Oeuvre`,
      );
    }

    // Create the Reponse
    const reponse = await this.prismaService.reponse.create({
      data: {
        ...createReponseDto,
        id_artisan,
      },
    });

    return reponse;
  }

  /**
   * Finds a reponse by ID_avis.
   * @param {number} id_avis - The ID of the avis.
   * @throws {NotFoundException} - Throws an exception if the reponse does not exist.
   * @returns {Promise} - Returns a Promise containing the reponse.
   */
  async findOneReponseByID(id_avis: number) {
    // Search for Avis and Oeuvre
    const avis = await this.avisService.findOne(id_avis);

    const oeuvre = await this.oeuvreService.findOne(avis.id_oeuvre);

    // Find the reponse for the avis.
    const reponse = await this.prismaService.reponse.findUnique({
      where: {
        id_artisan_id_avis: {
          id_avis,
          id_artisan: oeuvre.id_artisan,
        },
      },
    });

    // If no reponse was found, throw an exception.
    if (!reponse) {
      throw new NotFoundException(`No reponse for avis with ID ${id_avis}.`);
    }

    // Return the found reponse.
    return reponse;
  }

  /**
   * Deletes a Response for (Avis)
   * @param {number} id_avis - The ID of the Avis.
   * @returns {Promise<Reponse>} - The deleted Reponse.
   * @throws {NotFoundException} - If no Reponse exists for the provided ID Avis.
   */
  async remove(id_avis: number) {
    // Find the Reponse associated with the provided ID Avis.
    const reponse = await this.findOneReponseByID(id_avis);

    const deletedReponse = await this.prismaService.reponse.delete({
      where: {
        id_artisan_id_avis: {
          id_artisan: reponse.id_artisan,
          id_avis: reponse.id_avis,
        },
      },
    });

    // Return the deleted Reponse.
    return deletedReponse;
  }
}
