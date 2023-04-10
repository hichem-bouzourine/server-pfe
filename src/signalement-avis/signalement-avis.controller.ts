import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SignalementAvisService } from './signalement-avis.service';
import { CreateSignalementAvisDto } from './dto/create-signalement-avis.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';
import { AdminGuard } from '../admin/guards/admin.guard';

@Controller('signalement-avis')
export class SignalementAvisController {
  constructor(
    private readonly signalementAvisService: SignalementAvisService,
  ) {}

  @Post()
  create(@Body() createSignalementAvisDto: CreateSignalementAvisDto) {
    return this.signalementAvisService.create(createSignalementAvisDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.signalementAvisService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: number,
    @CurrentUser('id_utilisateur') id_utilisateur: number,
  ) {
    return this.signalementAvisService.approveSignale(id_utilisateur, id);
  }
}
