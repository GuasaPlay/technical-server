import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CareerOfferedService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      const careers = await this.prisma.careerOffered.findMany({
        select: {
          id: true,
          name: true,
          currentCapacity: true,
        },
      });
      return careers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las carreras ofrecidas',
      );
    }
  }

  async findCareersWithStudentCount() {
    try {
      const careers = await this.prisma.careerOffered.findMany({
        select: {
          name: true,
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });

      return careers.map((career) => ({
        name: career.name,
        studentsCount: career._count.enrollments,
      }));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las carreras con el número de estudiantes',
      );
    }
  }
}
