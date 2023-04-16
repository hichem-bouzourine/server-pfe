import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SauvegardeOeuvreService } from './sauvegarde-oeuvre.service';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ClientGuard } from '../guards/client.guard';

@UseGuards(ClientGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('sauvegarde-oeuvre')
export class SauvegardeOeuvreController {
  constructor(
    private readonly sauvegardeOeuvreService: SauvegardeOeuvreService,
  ) {}

  @Post()
  create(
    @Query('id_oeuvre', ParseIntPipe) id_oeuvre: number,
    @CurrentUser('id_utilisateur') id_client: number,
  ) {
    return this.sauvegardeOeuvreService.create(id_client, id_oeuvre);
  }

  @Get()
  findAll(@CurrentUser('id_utilisateur') id_client: number) {
    return this.sauvegardeOeuvreService.findAllSavedOeuvreForClient(id_client);
  }

  @Get('isSaved')
  checkIfOeuvreIsSaved(
    @CurrentUser('id_utilisateur') id_client: number,
    @Query('id_oeuvre', ParseIntPipe) id_oeuvre: number,
  ) {
    return this.sauvegardeOeuvreService.checkIfOeuvreIsSaved(
      id_client,
      id_oeuvre,
    );
  }

  @Delete()
  remove(
    @Query('id_oeuvre', ParseIntPipe) id_oeuvre: number,
    @CurrentUser('id_utilisateur') id_client: number,
  ) {
    return this.sauvegardeOeuvreService.remove(id_client, id_oeuvre);
  }
}
