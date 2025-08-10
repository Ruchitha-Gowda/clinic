import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQueueDto {
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsNumber()
  @IsNotEmpty()
  queueNumber: number;

  @IsString()
  status?: string; // optional, default in service

  @IsString()
  priority?: string; // optional
}
