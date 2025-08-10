import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patient.controller';
import { PatientsService } from './patient.service';
import { PatientQueue } from './patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientQueue])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientModule {}
