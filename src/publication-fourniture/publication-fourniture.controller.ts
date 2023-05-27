import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PublicationFournitureService } from './publication-fourniture.service';
import { CreatePublicationFournitureDto } from './dto/create-publication-fourniture.dto';
import { UpdatePublicationFournitureDto } from './dto/update-publication-fourniture.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/get-current-user.decorator';

@Controller('publication-fourniture')
export class PublicationFournitureController {
  constructor(
    private readonly publicationFournitureService: PublicationFournitureService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @CurrentUser('id_utilisateur') id_utilisateur: number,
    @CurrentUser('type') type: string,
    @Body() createPublicationFournitureDto: CreatePublicationFournitureDto,
  ) {
    return this.publicationFournitureService.create(
      id_utilisateur,
      type,
      createPublicationFournitureDto,
    );
  }

  @Get()
  findAll() {
    return this.publicationFournitureService.findAll();
  }

  @Get('/unique/')
  findOne(
    @Query('id_fournisseur', ParseIntPipe) id_fournisseur: number,
    @Query('id_fourniture', ParseIntPipe) id_fourniture: number,
  ) {
    return this.publicationFournitureService.findOne(
      id_fournisseur,
      id_fourniture,
    );
  }

  @Get('/fournisseur/:id_fournisseur')
  findManyByIDFournisseur(
    @Param('id_fournisseur', ParseIntPipe) id_fournisseur: number,
  ) {
    return this.publicationFournitureService.findManyByIDFournisseur(
      id_fournisseur,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id_fourniture')
  update(
    @CurrentUser('id_utilisateur') id_utilisateur: number,
    @Param('id_fourniture', ParseIntPipe) id_fourniture: number,
    @Body() updatePublicationFournitureDto: UpdatePublicationFournitureDto,
  ) {
    return this.publicationFournitureService.update(
      id_utilisateur,
      id_fourniture,
      updatePublicationFournitureDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id_fourniture')
  remove(
    @CurrentUser('id_utilisateur') id_utilisateur: number,
    @Param('id_fourniture', ParseIntPipe) id_fourniture: number,
  ) {
    return this.publicationFournitureService.remove(
      id_utilisateur,
      id_fourniture,
    );
  }
}
