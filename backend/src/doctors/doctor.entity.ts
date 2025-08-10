import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    specialization: string;

    @Column({ nullable: true, default: '' }) // optional with default empty string
    location: string;

    @Column({ nullable: true, default: '' })
    gender: string;

    @Column({ default: 'Available' })
    status: string; // Available, With Patient, On Leave, etc.

    @Column({ nullable: true, default: '' })
    availability: string;
}
