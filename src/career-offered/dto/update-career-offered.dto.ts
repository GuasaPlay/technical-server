import { PartialType } from '@nestjs/swagger';
import { CreateCareerOfferedDto } from './create-career-offered.dto';

export class UpdateCareerOfferedDto extends PartialType(CreateCareerOfferedDto) {}
