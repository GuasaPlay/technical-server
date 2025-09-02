import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

describe('PersonController', () => {
  let controller: PersonController;
  let mockPersonService: jest.Mocked<PersonService>;

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
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
    mockPersonService = module.get(PersonService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a person successfully', async () => {
      mockPersonService.create.mockResolvedValue(mockPerson);

      const result = await controller.create(createPersonDto);

      expect(mockPersonService.create).toHaveBeenCalledWith(createPersonDto);
      expect(result).toEqual(mockPerson);
    });

    it('should throw ConflictException when email already exists', async () => {
      mockPersonService.create.mockRejectedValue(
        new ConflictException('Una persona con este email ya existe'),
      );

      await expect(controller.create(createPersonDto)).rejects.toThrow(
        ConflictException,
      );

      expect(mockPersonService.create).toHaveBeenCalledWith(createPersonDto);
    });
  });

  describe('findAll', () => {
    it('should return all persons', async () => {
      const persons = [mockPerson];
      mockPersonService.findAll.mockResolvedValue(persons);

      const result = await controller.findAll();

      expect(mockPersonService.findAll).toHaveBeenCalled();
      expect(result).toEqual(persons);
    });

    it('should return empty array when no persons exist', async () => {
      mockPersonService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(mockPersonService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a person by id', async () => {
      mockPersonService.findOne.mockResolvedValue(mockPerson);

      const result = await controller.findOne('1');

      expect(mockPersonService.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPerson);
    });

    it('should throw NotFoundException when person not found', async () => {
      mockPersonService.findOne.mockRejectedValue(
        new NotFoundException('Persona con ID 1 no encontrada'),
      );

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);

      expect(mockPersonService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    const updatePersonDto: UpdatePersonDto = {
      name: 'Updated Name',
    };

    it('should update a person successfully', async () => {
      const updatedPerson = new Person({ ...mockPerson, name: 'Updated Name' });
      mockPersonService.update.mockResolvedValue(updatedPerson);

      const result = await controller.update('1', updatePersonDto);

      expect(mockPersonService.update).toHaveBeenCalledWith(
        '1',
        updatePersonDto,
      );
      expect(result).toEqual(updatedPerson);
    });

    it('should throw NotFoundException when person not found', async () => {
      mockPersonService.update.mockRejectedValue(
        new NotFoundException('Persona con ID 1 no encontrada'),
      );

      await expect(controller.update('1', updatePersonDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockPersonService.update).toHaveBeenCalledWith(
        '1',
        updatePersonDto,
      );
    });

    it('should throw ConflictException when email is already in use', async () => {
      const updateWithEmail: UpdatePersonDto = {
        email: 'existing@example.com',
      };

      mockPersonService.update.mockRejectedValue(
        new ConflictException('Una persona con este email ya existe'),
      );

      await expect(controller.update('1', updateWithEmail)).rejects.toThrow(
        ConflictException,
      );

      expect(mockPersonService.update).toHaveBeenCalledWith(
        '1',
        updateWithEmail,
      );
    });
  });

  describe('remove', () => {
    it('should remove a person successfully', async () => {
      mockPersonService.remove.mockResolvedValue(mockPerson);

      const result = await controller.remove('1');

      expect(mockPersonService.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPerson);
    });

    it('should throw NotFoundException when person not found', async () => {
      mockPersonService.remove.mockRejectedValue(
        new NotFoundException('Persona con ID 1 no encontrada'),
      );

      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);

      expect(mockPersonService.remove).toHaveBeenCalledWith('1');
    });
  });
});
