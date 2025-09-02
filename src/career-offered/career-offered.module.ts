import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CareerOfferedController } from './career-offered.controller';
import { CareerOfferedService } from './career-offered.service';

@Module({
  controllers: [CareerOfferedController],
  providers: [CareerOfferedService, PrismaService],
})
export class CareerOfferedModule {}
