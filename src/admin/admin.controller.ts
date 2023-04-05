import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './guards/admin.guard';
import { UpdateUserDto } from 'src/auth/dtos/update-user-.dto';

@UseGuards(AdminGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/admins')
  getAll() {
    return this.adminService.getAll();
  }

  @Get('/admins/:id')
  getOne(@Param('id') id: number) {
    return this.adminService.getOne(id);
  }

  @Get('/users')
  getFullList() {
    return this.adminService.getFullList();
  }

  @Get('/users/:email')
  getOneUser(@Param('email') email: string) {
    return this.adminService.getOneUser(email.toLowerCase().trim());
  }

  @Patch('/users/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.adminService.updateUser(id, body);
  }
}
