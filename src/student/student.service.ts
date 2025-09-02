import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(dni: string) {
    try {
      const student = await this.prisma.student.findUnique({
        where: { dni },
        select: {
          id: true,
          dni: true,
          names: true,
          surnames: true,
          email: true,
          originSchoolId: true,
          enrollments: {
            select: {
              id: true,
              enrollmentFee: true,
              careerOffered: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return { student, exists: !!student };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener el estudiante',
      );
    }
  }
}
