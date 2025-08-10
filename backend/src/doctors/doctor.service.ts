import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  findAll() {
    return this.doctorRepo.find();
  }

  findOne(id: number) {
    return this.doctorRepo.findOne({ where: { id } });
  }

  create(data: Partial<Doctor>) {
    const doc = this.doctorRepo.create(data);
    return this.doctorRepo.save(doc);
  }

  update(id: number, data: Partial<Doctor>) {
    return this.doctorRepo.update(id, data);
  }

  remove(id: number) {
    return this.doctorRepo.delete(id);
  }
}
