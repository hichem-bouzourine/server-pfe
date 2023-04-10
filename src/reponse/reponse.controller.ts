import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReponseService } from './reponse.service';
import { CreateReponseDto } from './dto/create-reponse.dto';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('reponse')
export class ReponseController {
  constructor(private readonly reponseService: ReponseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createReponseDto: CreateReponseDto,
    @CurrentUser('id_utilisateur') id: number,
  ) {
    return this.reponseService.create(createReponseDto, id);
  }

  @Get(':id_avis')
  findOne(@Param('id_avis', ParseIntPipe) id_avis: number) {
    return this.reponseService.findOneReponseByID(id_avis);
  }

  @Delete(':id_avis')
  remove(@Param('id_avis', ParseIntPipe) id_avis: number) {
    return this.reponseService.remove(id_avis);
  }
}
