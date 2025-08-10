import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
export class AppointmentsController {
  constructor(private apptService: AppointmentsService) {}

  @Get()
  findAll() {
    return this.apptService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.apptService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.apptService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.apptService.remove(id);
  }
}
