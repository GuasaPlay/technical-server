import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { Person } from '../entities/person.entity';
import { PersonRepository } from './person.repository';

describe('PersonRepository', () => {
  let repository: PersonRepository;
  let prismaService: PrismaService;

  const mockPersonData = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    status: true,
  };

  const createPersonDto: CreatePersonDto = {
    email: 'test@example.com',
    name: 'Test User',
    status: true,
  };

  beforeEach(async () => {
    const mockPrismaService = {
      person: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<PersonRepository>(PersonRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a person successfully', async () => {
      (prismaService.person.create as jest.Mock).mockResolvedValue(
        mockPersonData,
      );

      const result = await repository.create(createPersonDto);

      expect(prismaService.person.create).toHaveBeenCalledWith({
        data: createPersonDto,
      });
      expect(result).toBeInstanceOf(Person);
      expect(result).toEqual(new Person(mockPersonData));
    });
  });

  describe('findAll', () => {
    it('should return all persons ordered by name', async () => {
      const personsData = [
        mockPersonData,
        {
          id: '2',
          email: 'another@example.com',
          name: 'Another User',
          status: false,
        },
      ];
      (prismaService.person.findMany as jest.Mock).mockResolvedValue(
        personsData,
      );

      const result = await repository.findAll();

      expect(prismaService.person.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Person);
      expect(result[1]).toBeInstanceOf(Person);
    });

    it('should return empty array when no persons exist', async () => {
      (prismaService.person.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findAll();

      expect(prismaService.person.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a person by id', async () => {
      (prismaService.person.findUnique as jest.Mock).mockResolvedValue(
        mockPersonData,
      );

      const result = await repository.findById('1');

      expect(prismaService.person.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toBeInstanceOf(Person);
      expect(result).toEqual(new Person(mockPersonData));
    });

    it('should return null when person not found', async () => {
      (prismaService.person.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById('nonexistent');

      expect(prismaService.person.findUnique).toHaveBeenCalledWith({
        where: { id: 'nonexistent' },
      });
      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a person by email', async () => {
      (prismaService.person.findUnique as jest.Mock).mockResolvedValue(
        mockPersonData,
      );

      const result = await repository.findByEmail('test@example.com');

      expect(prismaService.person.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toBeInstanceOf(Person);
      expect(result).toEqual(new Person(mockPersonData));
    });

    it('should return null when person not found by email', async () => {
      (prismaService.person.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByEmail('nonexistent@example.com');

      expect(prismaService.person.findUnique).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
      });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a person successfully', async () => {
      const updatePersonDto: UpdatePersonDto = {
        name: 'Updated Name',
      };
      const updatedPersonData = { ...mockPersonData, name: 'Updated Name' };
      (prismaService.person.update as jest.Mock).mockResolvedValue(
        updatedPersonData,
      );

      const result = await repository.update('1', updatePersonDto);

      expect(prismaService.person.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updatePersonDto,
      });
      expect(result).toBeInstanceOf(Person);
      expect(result).toEqual(new Person(updatedPersonData));
    });
  });

  describe('delete', () => {
    it('should delete a person successfully', async () => {
      (prismaService.person.delete as jest.Mock).mockResolvedValue(
        mockPersonData,
      );

      const result = await repository.delete('1');

      expect(prismaService.person.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toBeInstanceOf(Person);
      expect(result).toEqual(new Person(mockPersonData));
    });
  });

  describe('exists', () => {
    it('should return true when person exists', async () => {
      (prismaService.person.count as jest.Mock).mockResolvedValue(1);

      const result = await repository.exists('1');

      expect(prismaService.person.count).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toBe(true);
    });

    it('should return false when person does not exist', async () => {
      (prismaService.person.count as jest.Mock).mockResolvedValue(0);

      const result = await repository.exists('nonexistent');

      expect(prismaService.person.count).toHaveBeenCalledWith({
        where: { id: 'nonexistent' },
      });
      expect(result).toBe(false);
    });
  });
});
