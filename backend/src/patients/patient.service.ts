import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientQueue } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(PatientQueue) private repo: Repository<PatientQueue>) { }

  findAll() {
    return this.repo.find();
  }

  create(data: { name?: string; patientName?: string; queueNumber?: number; status?: string }) {
    if (data.name && !data.patientName) {
      data.patientName = data.name;  // map frontend "name" field
    }
    if (!data.queueNumber) {
      // simple auto-increment in code, or assign last queue number + 1
      // Here, just an example hardcode
      data.queueNumber = Math.floor(Math.random() * 1000);
    }
    if (!data.status) {
      data.status = 'Waiting';
    }
    return this.repo.save(data);
  }


  remove(id: number) {
    return this.repo.delete(id);
  }
}
