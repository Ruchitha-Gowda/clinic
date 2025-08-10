import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctors/doctor.entity';
import { PatientQueue } from '../patients/patient.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private repo: Repository<Appointment>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(PatientQueue) private patientRepo: Repository<PatientQueue>,
  ) {}

  async findAll() {
    return this.repo.find({ relations: ['doctor', 'patient'] });
  }

  async create(data) {
    // Look up patient and doctor entities
    const patient = data.patientId
      ? await this.patientRepo.findOne({ where: { id: data.patientId } })
      : null;
    const doctor = data.doctorId
      ? await this.doctorRepo.findOne({ where: { id: data.doctorId } })
      : null;

    // Always extract patient name from entity
    const patientName = patient?.patientName || 'Unknown';

    // Save appointment with all necessary fields
    const appointment = this.repo.create({
      patientName,
      appointmentTime: data.time || data.appointmentTime,
      status: data.status || 'Booked',
      priority: data.priority,
      patient: patient || undefined,
      doctor: doctor || undefined,
    });
    return this.repo.save(appointment);
  }

  update(id: number, data) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
