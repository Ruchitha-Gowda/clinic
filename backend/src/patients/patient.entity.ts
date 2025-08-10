import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PatientQueue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  queueNumber: number;

  @Column({ default: 'Waiting' })
  status: string; // Waiting, With Doctor, Completed
}

