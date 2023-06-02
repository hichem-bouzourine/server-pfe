import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
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

  @Get('/userById/:id')
  getOneUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getOneUserById(id);
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

  @Delete('users/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  @Delete('oeuvre/:id')
  deleteOeuvre(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteOeuvre(id);
  }

  @Get('stats/oeuvres')
  getOeuvreStats() {
    return this.adminService.getOeuvresStats();
  }

  @Get('stats/categories')
  getCategoriesStats() {
    return this.adminService.getCategoriesStats();
  }

  @Get('stats/users')
  getUsersStats() {
    return this.adminService.getUsersStats();
  }

  @Get('stats/usersPerType')
  getUsersPerTypeStats() {
    return this.adminService.getUsersPerTypeStats();
  }

  @Get('stats/signalementsTraite')
  getTotalSignalementsTraite() {
    return this.adminService.getTotalSignalementsTraite();
  }

  @Get('stats/signalementsNonTraite')
  getTotalSignalementsNonTraite() {
    return this.adminService.getTotalSignalementsNonTraite();
  }

  @Get('stats/getUsersCountByMonth')
  getUsersCountByMonth() {
    return this.adminService.getUsersCountByMonth();
  }
}
