import { Controller, Get, Param } from '@nestjs/common';
import { CareerOfferedService } from './career-offered.service';

@Controller('career-offered')
export class CareerOfferedController {
  constructor(private readonly careerOfferedService: CareerOfferedService) {}

  @Get()
  findAll() {
    return this.careerOfferedService.findAll();
  }

  @Get('with-student-count')
  findCareersWithStudentCount() {
    return this.careerOfferedService.findCareersWithStudentCount();
  }

  @Get(':id/students')
  findCareerWithStudents(@Param('id') id: string) {
    return this.careerOfferedService.findCareerWithStudents(id);
  }
}
