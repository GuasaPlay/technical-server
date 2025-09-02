import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { CareerOfferedModule } from './career-offered/career-offered.module';
import { OriginSchoolModule } from './origin-school/origin-school.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [EnrollmentModule, CareerOfferedModule, OriginSchoolModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
