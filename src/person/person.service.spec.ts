import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import type { IPersonRepository } from './interfaces/person-repository.interface';
import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;
  let mockRepository: jest.Mocked<IPersonRepository>;

  const mockPerson: Person = new Person({
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    status: true,
  });

  const createPersonDto: CreatePersonDto = {
    email: 'test@example.com',
    name: 'Test User',
    status: true,
  };

  beforeEach(async () => {
    const mockPersonRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: 'IPersonRepository',
          useValue: mockPersonRepository,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    mockRepository = module.get('IPersonRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a person successfully', async () => {
      mockRepository.findByEmail.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(mockPerson);

      const result = await service.create(createPersonDto);

      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        createPersonDto.email,
      );
      expect(mockRepository.create).toHaveBeenCalledWith(createPersonDto);
      expect(result).toEqual(mockPerson);
    });

    it('should throw ConflictException if email already exists', async () => {
      mockRepository.findByEmail.mockResolvedValue(mockPerson);

      await expect(service.create(createPersonDto)).rejects.toThrow(
        new ConflictException('Una persona con este email ya existe'),
      );

      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        createPersonDto.email,
      );
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all persons', async () => {
      const persons = [mockPerson];
      mockRepository.findAll.mockResolvedValue(persons);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(persons);
    });

    it('should return empty array when no persons exist', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a person by id', async () => {
      mockRepository.findById.mockResolvedValue(mockPerson);

      const result = await service.findOne('1');

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPerson);
    });

    it('should throw NotFoundException if person not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        new NotFoundException('Persona con ID 1 no encontrada'),
      );

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    const updatePersonDto: UpdatePersonDto = {
      name: 'Updated Name',
    };

    it('should update a person successfully', async () => {
      const updatedPerson = new Person({ ...mockPerson, name: 'Updated Name' });
      mockRepository.exists.mockResolvedValue(true);
      mockRepository.update.mockResolvedValue(updatedPerson);

      const result = await service.update('1', updatePersonDto);

      expect(mockRepository.exists).toHaveBeenCalledWith('1');
      expect(mockRepository.update).toHaveBeenCalledWith('1', updatePersonDto);
      expect(result).toEqual(updatedPerson);
    });

    it('should throw NotFoundException if person does not exist', async () => {
      mockRepository.exists.mockResolvedValue(false);

      await expect(service.update('1', updatePersonDto)).rejects.toThrow(
        new NotFoundException('Persona con ID 1 no encontrada'),
      );

      expect(mockRepository.exists).toHaveBeenCalledWith('1');
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should update email if not in use by another person', async () => {
      const updateWithEmail: UpdatePersonDto = {
        email: 'newemail@example.com',
        name: 'Updated Name',
      };
      const updatedPerson = new Person({ ...mockPerson, ...updateWithEmail });

      mockRepository.exists.mockResolvedValue(true);
      mockRepository.findByEmail.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue(updatedPerson);

      const result = await service.update('1', updateWithEmail);

      expect(mockRepository.exists).toHaveBeenCalledWith('1');
      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        'newemail@example.com',
      );
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateWithEmail);
      expect(result).toEqual(updatedPerson);
    });

    it('should allow updating email for the same person', async () => {
      const updateWithEmail: UpdatePersonDto = {
        email: 'test@example.com',
        name: 'Updated Name',
      };
      const updatedPerson = new Person({ ...mockPerson, ...updateWithEmail });

      mockRepository.exists.mockResolvedValue(true);
      mockRepository.findByEmail.mockResolvedValue(mockPerson);
      mockRepository.update.mockResolvedValue(updatedPerson);

      const result = await service.update('1', updateWithEmail);

      expect(mockRepository.exists).toHaveBeenCalledWith('1');
      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateWithEmail);
      expect(result).toEqual(updatedPerson);
    });

    it('should throw ConflictException if email is used by another person', async () => {
      const updateWithEmail: UpdatePersonDto = {
        email: 'existing@example.com',
      };
      const anotherPerson = new Person({
        id: '2',
        email: 'existing@example.com',
        name: 'Another User',
        status: true,
      });

      mockRepository.exists.mockResolvedValue(true);
      mockRepository.findByEmail.mockResolvedValue(anotherPerson);

      await expect(service.update('1', updateWithEmail)).rejects.toThrow(
        new ConflictException('Una persona con este email ya existe'),
      );

      expect(mockRepository.exists).toHaveBeenCalledWith('1');
      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        'existing@example.com',
      );
      expect(mockRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a person successfully', async () => {
      mockRepository.exists.mockResolvedValue(true);
      mockRepository.delete.mockResolvedValue(mockPerson);

      const result = await service.remove('1');

      expect(mockRepository.exists).toHaveBeenCalledWith('1');
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPerson);
    });

    it('should throw NotFoundException if person does not exist', async () => {
      mockRepository.exists.mockResolvedValue(false);

      await expect(service.remove('1')).rejects.toThrow(
        new NotFoundException('Persona con ID 1 no encontrada'),
      );

      expect(mockRepository.exists).toHaveBeenCalledWith('1');
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should return a person by email', async () => {
      mockRepository.findByEmail.mockResolvedValue(mockPerson);

      const result = await service.findByEmail('test@example.com');

      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(result).toEqual(mockPerson);
    });

    it('should return null if person not found by email', async () => {
      mockRepository.findByEmail.mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@example.com');

      expect(mockRepository.findByEmail).toHaveBeenCalledWith(
        'nonexistent@example.com',
      );
      expect(result).toBeNull();
    });
  });
});
