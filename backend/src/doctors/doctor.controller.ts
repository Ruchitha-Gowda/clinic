import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctor.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('doctors')
@UseGuards(AuthGuard('jwt'))
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.doctorsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.doctorsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.doctorsService.remove(id);
  }
}
