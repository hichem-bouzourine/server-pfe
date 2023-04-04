import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './guards/admin.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('admins')
  getAll() {
    return this.adminService.getAll();
  }

  @Get('/admins/:id')
  getOne(@Param('id') id: number) {
    return this.adminService.getOne(id);
  }

  @Get('/full')
  @UseGuards(AdminGuard)
  getFullList() {
    return this.adminService.getFullList();
  }
}
