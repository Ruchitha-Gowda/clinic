import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { PatientQueue } from '../patients/patient.entity';
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @ManyToOne(() => PatientQueue)
  patient: PatientQueue;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @Column()
  appointmentTime: Date;

  @Column({ default: 'Booked' })
  status: string;

  @Column({ nullable: true })
  priority?: string;
}
