import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Type_User } from '@prisma/client';

const config = new ConfigService();
const jwtService = new JwtService({});

export async function signToken(
  id: number,
  email: string,
  type: Type_User,
): Promise<string> {
  const payload = {
    id,
    email,
    type,
  };

  const secret = config.get<string>('JWT_SECRET');

  const token = await jwtService.signAsync(payload, { secret });

  return token;
}
