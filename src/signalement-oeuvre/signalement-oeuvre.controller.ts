import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SignalementOeuvreService } from './signalement-oeuvre.service';
import { CreateSignalementOeuvreDto } from './dto/create-signalement-oeuvre.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('signalement-oeuvre')
export class SignalementOeuvreController {
  constructor(
    private readonly signalementOeuvreService: SignalementOeuvreService,
  ) {}

  @Post()
  create(@Body() createSignalementOeuvreDto: CreateSignalementOeuvreDto) {
    return this.signalementOeuvreService.create(createSignalementOeuvreDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.signalementOeuvreService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: number,
    @CurrentUser('id_utilisateur') id_utilisateur: number,
  ) {
    return this.signalementOeuvreService.approveSignale(id_utilisateur, id);
  }
}
