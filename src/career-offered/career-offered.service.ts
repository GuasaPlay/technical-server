import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
          id: true,
          name: true,
          currentCapacity: true,
          originalCapacity: true,
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });

      return careers.map((career) => ({
        id: career.id,
        name: career.name,
        currentCapacity: career.currentCapacity,
        originalCapacity: career.originalCapacity,
        studentsCount: career._count.enrollments,
      }));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las carreras con el número de estudiantes',
      );
    }
  }

  async findCareerWithStudents(id: string) {
    try {
      const career = await this.prisma.careerOffered.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          originalCapacity: true,
          currentCapacity: true,
          enrollments: {
            select: {
              id: true,
              status: true,
              enrollmentFee: true,
              createdAt: true,
              student: {
                select: {
                  id: true,
                  dni: true,
                  names: true,
                  surnames: true,
                  email: true,
                  originSchool: {
                    select: {
                      name: true,
                      city: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!career) {
        throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
      }

      return {
        id: career.id,
        name: career.name,
        originalCapacity: career.originalCapacity,
        currentCapacity: career.currentCapacity,
        totalEnrollments: career.enrollments.length,
        students: career.enrollments.map((enrollment) => ({
          id: enrollment.student.id,
          dni: enrollment.student.dni,
          fullName: `${enrollment.student.names} ${enrollment.student.surnames}`,
          email: enrollment.student.email,
          originSchool: enrollment.student.originSchool.name,
          originCity: enrollment.student.originSchool.city,
          enrollment: {
            id: enrollment.id,
            enrollmentFee: enrollment.enrollmentFee,
            date: enrollment.createdAt,
          },
        })),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener la carrera con estudiantes',
      );
    }
  }
}
