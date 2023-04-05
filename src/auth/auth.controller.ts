import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { ArtisanService } from '../artisan/artisan.service';
import { ClientService } from '../client/client.service';
import { FournisseurService } from '../fournisseur/fournisseur.service';
import { AuthService } from './auth.service';
import { Type_User } from '@prisma/client';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { CreateArtisanDto } from './dtos/create-artisan.dto';
import { CreateClientDto } from './dtos/create-client.dto';
import { CreateFournisseurDto } from './dtos/create-fournisseur.dto';
import { LoginDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private fournisseurService: FournisseurService,
    private artisanService: ArtisanService,
    private clientService: ClientService,
    private adminService: AdminService,
  ) {}

  @Post('signup/admin')
  signupAdmin(@Body() body: CreateAdminDto) {
    const { type } = body;
    if (type === Type_User.ADMIN) return this.adminService.createAdmin(body);

    throw new BadRequestException(`User is not of type ${Type_User.ADMIN}`);
  }

  @Post('signup/fournisseur')
  signupFournisseur(@Body() body: CreateFournisseurDto) {
    const { type } = body;
    if (type === Type_User.FOURNISSEUR)
      return this.fournisseurService.createFournisseur(body);

    throw new BadRequestException(
      `User is not of type ${Type_User.FOURNISSEUR}`,
    );
  }

  @Post('signup/artisan')
  signupArtisan(@Body() body: CreateArtisanDto) {
    const { type } = body;
    if (type === Type_User.ARTISAN)
      return this.artisanService.createArtisan(body);

    throw new BadRequestException(`User is not of type ${Type_User.ARTISAN}`);
  }

  @Post('signup/client')
  signupClient(@Body() body: CreateClientDto) {
    const { type } = body;
    if (type === Type_User.CLIENT) return this.clientService.createClient(body);

    throw new BadRequestException(`User is not of type ${Type_User.CLIENT}`);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(
      body.email.toLowerCase().trim(),
      body.password,
    );
  }
}
