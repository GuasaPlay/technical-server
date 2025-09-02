import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { Person } from '../entities/person.entity';
import { IPersonRepository } from '../interfaces/person-repository.interface';

@Injectable()
export class PersonRepository implements IPersonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const personData = await this.prisma.person.create({
      data: createPersonDto,
    });
    return new Person(personData);
  }

  async findAll(): Promise<Person[]> {
    const persons = await this.prisma.person.findMany({
      orderBy: { name: 'asc' },
    });
    return persons.map((person) => new Person(person));
  }

  async findById(id: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: { id },
    });
    return person ? new Person(person) : null;
  }

  async findByEmail(email: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: { email },
    });
    return person ? new Person(person) : null;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const updatedPerson = await this.prisma.person.update({
      where: { id },
      data: updatePersonDto,
    });
    return new Person(updatedPerson);
  }

  async delete(id: string): Promise<Person> {
    const deletedPerson = await this.prisma.person.delete({
      where: { id },
    });
    return new Person(deletedPerson);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.person.count({
      where: { id },
    });
    return count > 0;
  }
}
