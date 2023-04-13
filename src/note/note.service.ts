import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}

  async create(createNoteDto: CreateNoteDto, id_client: number) {
    const { id_oeuvre } = createNoteDto;

    const client = await this.prismaService.client.findUnique({
      where: { id_client },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id_client} not found`);
    }

    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre },
    });

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with id ${id_oeuvre} not found`);
    }

    const existingNote = await this.prismaService.note.findUnique({
      where: {
        id_client_id_oeuvre: {
          id_client,
          id_oeuvre,
        },
      },
    });

    if (existingNote) {
      throw new BadRequestException(
        `Note for Oeuvre ${id_oeuvre} by Client ${id_client} already exists`,
      );
    }

    const note = await this.prismaService.note.create({
      data: {
        ...createNoteDto,
        id_client,
      },
    });

    return note;
  }

  async findOne(id_oeuvre: number, id_client: number) {
    const client = await this.prismaService.client.findUnique({
      where: { id_client },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id_client} not found`);
    }

    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre },
    });

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with id ${id_oeuvre} not found`);
    }

    const note = await this.prismaService.note.findUnique({
      where: {
        id_client_id_oeuvre: {
          id_client,
          id_oeuvre,
        },
      },
    });

    if (!note) {
      throw new BadRequestException(
        `Note for Oeuvre ${id_oeuvre} by Client ${id_client} doesn't exists`,
      );
    }

    return note;
  }

  async update(
    id_oeuvre: number,
    updateNoteDto: UpdateNoteDto,
    id_client: number,
  ) {
    await this.findOne(id_oeuvre, id_client);

    const updatedNote = await this.prismaService.note.update({
      where: {
        id_client_id_oeuvre: {
          id_client,
          id_oeuvre,
        },
      },
      data: {
        note: updateNoteDto.note,
      },
    });

    return updatedNote;
  }

  async remove(id_oeuvre: number, id_client: number) {
    await this.findOne(id_oeuvre, id_client);

    const deletedNote = await this.prismaService.note.delete({
      where: {
        id_client_id_oeuvre: {
          id_client,
          id_oeuvre,
        },
      },
    });

    return deletedNote;
  }
}