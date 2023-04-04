import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { signToken } from 'src/utils/signtoken.jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async login(email: string, password: string) {
    // find user by email
    const userByEmail = await this.prismaService.utilisateur.findFirst({
      where: {
        email,
      },
    });

    if (!userByEmail) throw new NotFoundException('user not found');

    const [salt, hash] = userByEmail.password.split('.');

    const pass = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = pass.toString('hex');

    if (hashedPassword !== hash)
      throw new BadRequestException('Incorrect password');

    // Generate the token
    const { password: storedPassword, ...rest } = userByEmail;
    const token = await signToken(rest.id_utilisateur, email, rest.type);

    return {
      user: rest,
      token,
    };
  }
}
