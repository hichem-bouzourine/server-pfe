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

  async create(createNoteDto: CreateNoteDto, id_utilisateur: number) {
    const { id_oeuvre } = createNoteDto;

    const user = await this.prismaService.utilisateur.findUnique({
      where: { id_utilisateur },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id_utilisateur} not found`);
    }

    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre },
    });

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with id ${id_oeuvre} not found`);
    }

    const existingNote = await this.prismaService.note.findUnique({
      where: {
        id_utilisateur_id_oeuvre: {
          id_utilisateur,
          id_oeuvre,
        },
      },
    });

    if (existingNote) {
      throw new BadRequestException(
        `Note for Oeuvre ${id_oeuvre} by User ${id_utilisateur} already exists`,
      );
    }

    const note = await this.prismaService.note.create({
      data: {
        ...createNoteDto,
        id_utilisateur,
      },
    });

    return note;
  }

  async findOne(id_oeuvre: number, id_utilisateur: number) {
    const client = await this.prismaService.utilisateur.findUnique({
      where: { id_utilisateur },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id_utilisateur} not found`);
    }

    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre },
    });

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with id ${id_oeuvre} not found`);
    }

    const note = await this.prismaService.note.findUnique({
      where: {
        id_utilisateur_id_oeuvre: {
          id_utilisateur,
          id_oeuvre,
        },
      },
    });

    if (!note) {
      throw new BadRequestException(
        `Note for Oeuvre ${id_oeuvre} by User ${id_utilisateur} doesn't exists`,
      );
    }

    return note;
  }

  async getCountAndAvgForOeuvre(id_oeuvre: number) {
    // Check the existance of Oeuvre.
    const oeuvre = await this.prismaService.oeuvre.findUnique({
      where: { id_oeuvre },
    });

    if (!oeuvre) {
      throw new NotFoundException(`Oeuvre with id ${id_oeuvre} not found`);
    }
    // Check the existance of Notes for the Oeuvre.
    const notes = await this.prismaService.note.findMany({
      where: { id_oeuvre },
    });

    if (!notes.length) {
      throw new NotFoundException(`No Notes for Oeuvre with id ${id_oeuvre}`);
    }

    // Initialize values
    const count: number = notes.length;
    let total: number = 0;

    // Iterate the array of notes per oeuvre and calculate the total notes.
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      total += element.note;
    }

    // Calculate the average note for the oeuvre
    const avg = total / count;
    let roundedAvg = Math.round(avg * 100) / 100;

    // Check if the decimal part is less than 0.25
    if (roundedAvg % 1 < 0.25) {
      roundedAvg = Math.floor(roundedAvg) + 0.0;
    }
    // Check if the decimal part is between 0.25 and 0.75
    else if (roundedAvg % 1 < 0.75) {
      roundedAvg = Math.floor(roundedAvg) + 0.5;
    }
    // Otherwise, the decimal part is greater than or equal to 0.75
    else roundedAvg = Math.ceil(roundedAvg);

    return {
      id_oeuvre,
      count,
      avg: roundedAvg,
    };
  }

  async update(
    id_oeuvre: number,
    updateNoteDto: UpdateNoteDto,
    id_utilisateur: number,
  ) {
    await this.findOne(id_oeuvre, id_utilisateur);

    const updatedNote = await this.prismaService.note.update({
      where: {
        id_utilisateur_id_oeuvre: {
          id_utilisateur,
          id_oeuvre,
        },
      },
      data: {
        note: updateNoteDto.note,
      },
    });

    return updatedNote;
  }

  async remove(id_oeuvre: number, id_utilisateur: number) {
    await this.findOne(id_oeuvre, id_utilisateur);

    const deletedNote = await this.prismaService.note.delete({
      where: {
        id_utilisateur_id_oeuvre: {
          id_utilisateur,
          id_oeuvre,
        },
      },
    });

    return deletedNote;
  }
}
