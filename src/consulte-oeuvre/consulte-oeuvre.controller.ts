import {
  Controller,
  Get,
  Post,
  BadRequestException,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ConsulteOeuvreService } from './consulte-oeuvre.service';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';
import { Type_User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('consulte-oeuvre')
export class ConsulteOeuvreController {
  constructor(private readonly consulteOeuvreService: ConsulteOeuvreService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Query('id_oeuvre', ParseIntPipe) id_oeuvre: number,
    @CurrentUser('id_utilisateur') id_client: number,
    @CurrentUser('type') type: string,
  ) {
    if (type !== Type_User.CLIENT) {
      throw new BadRequestException(`You are not a client`);
    }

    return this.consulteOeuvreService.create(id_client, id_oeuvre);
  }

  @Get()
  findAllConsultesForOeuvre(
    @Query('id_oeuvre', ParseIntPipe) id_oeuvre: number,
  ) {
    return this.consulteOeuvreService.findAllConsultesForOeuvre(id_oeuvre);
  }

  @Get('/client')
  findAllOeuvresConsulteParClient(
    @Query('id_client', ParseIntPipe) id_client: number,
  ) {
    return this.consulteOeuvreService.findAllOeuvresConsulteParClient(
      id_client,
    );
  }
}
