import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { Person } from '../entities/person.entity';

export interface IPersonRepository {
  create(createPersonDto: CreatePersonDto): Promise<Person>;
  findAll(): Promise<Person[]>;
  findById(id: string): Promise<Person | null>;
  findByEmail(email: string): Promise<Person | null>;
  update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person>;
  delete(id: string): Promise<Person>;
  exists(id: string): Promise<boolean>;
}
