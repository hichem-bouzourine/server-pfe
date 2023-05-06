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

@UseGuards(AuthGuard('jwt'))
@Controller('sauvegarde-oeuvre')
export class SauvegardeOeuvreController {
  constructor(
    private readonly sauvegardeOeuvreService: SauvegardeOeuvreService,
  ) {}

  @Post()
  create(
    @Query('id_oeuvre', ParseIntPipe) id_oeuvre: number,
    @CurrentUser('id_utilisateur') id_utilisateur: number,
  ) {
    return this.sauvegardeOeuvreService.create(id_utilisateur, id_oeuvre);
  }

  @Get()
  findAll(@CurrentUser('id_utilisateur') id_utilisateur: number) {
    return this.sauvegardeOeuvreService.findAllSavedOeuvreForUser(
      id_utilisateur,
    );
  }

  @Get('isSaved')
  checkIfOeuvreIsSaved(
    @CurrentUser('id_utilisateur') id_utilisateur: number,
    @Query('id_oeuvre', ParseIntPipe) id_oeuvre: number,
  ) {
    return this.sauvegardeOeuvreService.checkIfOeuvreIsSaved(
      id_utilisateur,
      id_oeuvre,
    );
  }

  @Delete()
  remove(
    @Query('id_oeuvre', ParseIntPipe) id_oeuvre: number,
    @CurrentUser('id_utilisateur') id_utilisateur: number,
  ) {
    return this.sauvegardeOeuvreService.remove(id_utilisateur, id_oeuvre);
  }
}
