import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QueueEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;  // required

  @Column()
  queueNumber: number;  // required

  @Column()
  status: string;

  @Column({ nullable: true })
  priority: string;
}
