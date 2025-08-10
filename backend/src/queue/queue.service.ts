import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntry } from './queue.entity';
import { CreateQueueDto } from './dto/create-queue.dto';

@Injectable()
export class QueueService {
  constructor(@InjectRepository(QueueEntry) private repo: Repository<QueueEntry>) {}

  findAll() {
    return this.repo.find();
  }

  // THIS is what you must use in the controller
  async createQueueEntry(dto: CreateQueueDto) {
    // status defaults to "Waiting" if not sent
    const entry = this.repo.create({
      patientName: dto.patientName,
      queueNumber: dto.queueNumber,
      status: dto.status || 'Waiting',
      priority: dto.priority || 'Normal' // if desired
    });
    return this.repo.save(entry);
  }

  update(id: number, data) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
