import {Module, Injectable} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import { DoctorModule } from './doctors/doctor.module';
import { PatientModule } from './patients/patient.module';
import { AppointmentModule } from './appointments/appointment.module';
import { QueueModule } from './queue/queue.module';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module ({
  imports: [
    ConfigModule.forRoot ({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    DoctorModule,
    PatientModule,
    AppointmentModule,
    QueueModule
  ]
})

export class AppModule{}

