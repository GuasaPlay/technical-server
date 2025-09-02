import { Controller, Get } from '@nestjs/common';
import { OriginSchoolService } from './origin-school.service';

@Controller('origin-school')
export class OriginSchoolController {
  constructor(private readonly originSchoolService: OriginSchoolService) {}

  @Get()
  findAll() {
    return this.originSchoolService.findAll();
  }
}
