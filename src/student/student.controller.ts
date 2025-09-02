import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.studentService.findOne(dni);
  }
}
