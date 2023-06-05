import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { SignalementProfileService } from './signalement-profile.service';
import { CreateSignalementProfileDto } from './dto/create-signalement-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('signalement-profile')
export class SignalementProfileController {
  constructor(
    private readonly signalementProfileService: SignalementProfileService,
  ) {}

  @Post()
  create(@Body() createSignalementProfileDto: CreateSignalementProfileDto) {
    return this.signalementProfileService.create(createSignalementProfileDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.signalementProfileService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  traiteSignale(
    @Param('id', ParseIntPipe) id: number,
    @Query('resultat', ParseBoolPipe) resultat: boolean,
    @CurrentUser('id_utilisateur') id_utilisateur: number,
  ) {
    return this.signalementProfileService.traiteSignale(
      id_utilisateur,
      id,
      resultat,
    );
  }
}
