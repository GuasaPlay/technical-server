import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OriginSchoolController } from './origin-school.controller';
import { OriginSchoolService } from './origin-school.service';

@Module({
  controllers: [OriginSchoolController],
  providers: [OriginSchoolService, PrismaService],
})
export class OriginSchoolModule {}
