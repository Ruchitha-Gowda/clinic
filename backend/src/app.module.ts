import { Module, Injectable } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { DoctorModule } from './doctors/doctor.module';
import { PatientModule } from './patients/patient.module';
import { AppointmentModule } from './appointments/appointment.module';
import { QueueModule } from './queue/queue.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
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
  ],
  controllers: [AppController],  
  providers: [AppService],
})

export class AppModule { }

