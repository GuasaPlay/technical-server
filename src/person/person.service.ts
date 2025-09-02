import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import type { IPersonRepository } from './interfaces/person-repository.interface';

@Injectable()
export class PersonService {
  constructor(
    @Inject('IPersonRepository')
    private readonly personRepository: IPersonRepository,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    // Verificar si el email ya existe
    const existingPerson = await this.personRepository.findByEmail(
      createPersonDto.email,
    );
    if (existingPerson) {
      throw new ConflictException('Una persona con este email ya existe');
    }

    return this.personRepository.create(createPersonDto);
  }

  async findAll(): Promise<Person[]> {
    return this.personRepository.findAll();
  }

  async findOne(id: string): Promise<Person> {
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }
    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    // Verificar si la persona existe
    const exists = await this.personRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }

    // Si se está actualizando el email, verificar que no esté en uso
    if (updatePersonDto.email) {
      const existingPerson = await this.personRepository.findByEmail(
        updatePersonDto.email,
      );
      if (existingPerson && existingPerson.id !== id) {
        throw new ConflictException('Una persona con este email ya existe');
      }
    }

    return this.personRepository.update(id, updatePersonDto);
  }

  async remove(id: string): Promise<Person> {
    const exists = await this.personRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }

    return this.personRepository.delete(id);
  }

  async findByEmail(email: string): Promise<Person | null> {
    return this.personRepository.findByEmail(email);
  }
}
