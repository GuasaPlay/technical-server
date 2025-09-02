import { Controller, Get } from '@nestjs/common';
import { CareerOfferedService } from './career-offered.service';

@Controller('career-offered')
export class CareerOfferedController {
  constructor(private readonly careerOfferedService: CareerOfferedService) {}

  @Get()
  findAll() {
    return this.careerOfferedService.findAll();
  }
}
