import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PatientsService } from './patient.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('patients')
@UseGuards(AuthGuard('jwt'))
export class PatientsController {
  constructor(private service: PatientsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
create(@Body() body: { patientName: string; queueNumber: number }) {
  return this.service.create(body);
}


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
