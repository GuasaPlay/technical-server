import { PartialType } from '@nestjs/swagger';
import { CreateOriginSchoolDto } from './create-origin-school.dto';

export class UpdateOriginSchoolDto extends PartialType(CreateOriginSchoolDto) {}
