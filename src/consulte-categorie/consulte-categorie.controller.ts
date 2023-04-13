import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ConsulteCategorieService } from './consulte-categorie.service';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';
import { Type_User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('consulte-categorie')
export class ConsulteCategorieController {
  constructor(
    private readonly consulteCategorieService: ConsulteCategorieService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Query('id_categorie', ParseIntPipe) id_categorie: number,
    @CurrentUser('id_utilisateur') id_client: number,
    @CurrentUser('type') type: string,
  ) {
    if (type !== Type_User.CLIENT) {
      throw new BadRequestException(`You are not a client`);
    }
    return this.consulteCategorieService.create(id_client, id_categorie);
  }

  @Get()
  findAll(@Query('id_categorie', ParseIntPipe) id_categorie: number) {
    return this.consulteCategorieService.findAllConsultesForCategorie(
      id_categorie,
    );
  }

  @Get('client')
  findOne(@Query('id_client', ParseIntPipe) id_client: number) {
    return this.consulteCategorieService.findAllCategoriesConsulteParClient(
      id_client,
    );
  }
}
