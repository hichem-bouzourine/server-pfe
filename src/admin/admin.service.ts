import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../auth/dtos/create-admin.dto';
import { hashPassword } from '../auth/common/hashPassword';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}
  async createAdmin(body: CreateAdminDto) {
    const { date_de_naissance, date_inscription, password, ...userData } = body;

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
        Administrateur: {
          create: {},
        },
      },
    });

    return user;
  }
}
