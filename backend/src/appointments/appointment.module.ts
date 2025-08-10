import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointment.controller';
import { AppointmentsService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctors/doctor.entity';
import { PatientQueue } from '../patients/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Doctor, PatientQueue])
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentModule {}
