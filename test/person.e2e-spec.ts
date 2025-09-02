import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('Person API (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  beforeEach(async () => {
    // Limpiar la base de datos antes de cada prueba
    await prismaService.person.deleteMany();
  });

  afterAll(async () => {
    // Limpiar la base de datos al final
    await prismaService.person.deleteMany();
    await prismaService.$disconnect();
    await app.close();
  });

  const validPersonData = {
    email: 'test@example.com',
    name: 'Test User',
    status: true,
  };

  describe('POST /person', () => {
    it('should create a person with valid data', async () => {
      const response = await supertest(app.getHttpServer())
        .post('/person')
        .send(validPersonData)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        ...validPersonData,
      });
    });

    it('should reject person with invalid email', async () => {
      const invalidData = { ...validPersonData, email: 'invalid-email' };

      await supertest(app.getHttpServer())
        .post('/person')
        .send(invalidData)
        .expect(400);
    });

    it('should reject person with missing required fields', async () => {
      const incompleteData = { email: 'test@example.com' };

      await supertest(app.getHttpServer())
        .post('/person')
        .send(incompleteData)
        .expect(400);
    });
  });

  describe('GET /person', () => {
    it('should return empty array when no persons exist', async () => {
      const response = await supertest(app.getHttpServer())
        .get('/person')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all persons', async () => {
      // Crear una persona
      await supertest(app.getHttpServer())
        .post('/person')
        .send(validPersonData);

      // Obtener todas las personas
      const response = await supertest(app.getHttpServer())
        .get('/person')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject(validPersonData);
    });
  });

  describe('GET /person/:id', () => {
    it('should return a person by id', async () => {
      // Crear una persona
      const createResponse = await supertest(app.getHttpServer())
        .post('/person')
        .send(validPersonData);

      const personId = createResponse.body.id;

      // Obtener la persona por ID
      const response = await supertest(app.getHttpServer())
        .get(`/person/${personId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: personId,
        ...validPersonData,
      });
    });

    it('should return 404 for non-existent person', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';

      await supertest(app.getHttpServer())
        .get(`/person/${nonExistentId}`)
        .expect(404);
    });
  });

  describe('PATCH /person/:id', () => {
    it('should update a person successfully', async () => {
      // Crear una persona
      const createResponse = await supertest(app.getHttpServer())
        .post('/person')
        .send(validPersonData);

      const personId = createResponse.body.id;
      const updateData = { name: 'Updated Name' };

      // Actualizar la persona
      const response = await supertest(app.getHttpServer())
        .patch(`/person/${personId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toMatchObject({
        id: personId,
        ...validPersonData,
        ...updateData,
      });
    });

    it('should return 404 when updating non-existent person', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData = { name: 'Updated Name' };

      await supertest(app.getHttpServer())
        .patch(`/person/${nonExistentId}`)
        .send(updateData)
        .expect(404);
    });
  });

  describe('DELETE /person/:id', () => {
    it('should delete a person successfully', async () => {
      // Crear una persona
      const createResponse = await supertest(app.getHttpServer())
        .post('/person')
        .send(validPersonData);

      const personId = createResponse.body.id;

      // Eliminar la persona
      const response = await supertest(app.getHttpServer())
        .delete(`/person/${personId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: personId,
        ...validPersonData,
      });

      // Verificar que la persona fue eliminada
      await supertest(app.getHttpServer())
        .get(`/person/${personId}`)
        .expect(404);
    });

    it('should return 404 when deleting non-existent person', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';

      await supertest(app.getHttpServer())
        .delete(`/person/${nonExistentId}`)
        .expect(404);
    });
  });
});
