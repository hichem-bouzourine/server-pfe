import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SignalementProfileService } from './signalement-profile.service';
import { CreateSignalementProfileDto } from './dto/create-signalement-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { CurrentUser } from 'src/auth/decorators/get-current-user.decorator';

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
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id_utilisateur') id_utilisateur: number,
  ) {
    return this.signalementProfileService.approveSignale(id_utilisateur, id);
  }
}
