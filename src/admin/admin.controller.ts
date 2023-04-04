import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('admins')
  getAll() {
    return this.adminService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.adminService.getOne(id);
  }
}
