import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonRepository } from './repositories/person.repository';

@Module({
  controllers: [PersonController],
  providers: [
    PersonService,
    PrismaService,
    {
      provide: 'IPersonRepository',
      useClass: PersonRepository,
    },
  ],
  exports: [PersonService],
})
export class PersonModule {}
