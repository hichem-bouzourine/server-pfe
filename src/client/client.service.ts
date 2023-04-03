import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from '../auth/common/hashPassword';
import { CreateClientDto } from '../auth/dtos/create-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prismaService: PrismaService) {}
  async createClient(body: CreateClientDto) {
    const {
      preference_art,
      date_de_naissance,
      date_inscription,
      password,
      ...userData
    } = body;

    // Check if user exists already exists
    const userByEmail = await this.prismaService.utilisateur.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (userByEmail) throw new BadRequestException('user already exists');

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.utilisateur.create({
      data: {
        ...userData,
        password: hashedPassword,
        date_de_naissance: new Date(date_de_naissance),
        date_inscription: new Date(date_inscription),
        Client: {
          create: {
            preference_art,
          },
        },
      },
    });

    return user;
  }
}
