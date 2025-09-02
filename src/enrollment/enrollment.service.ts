import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { uuid } from 'src/common/utils/uuid.util';
import { PrismaService } from 'src/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { careerOfferedId, originSchoolId, dni } = createEnrollmentDto;

    const student = await this.prisma.student.findUnique({
      where: { dni },
      select: { id: true },
    });

    if (student) throw new NotFoundException('Estudiante ya existe');

    const originSchool = await this.prisma.originSchool.findUnique({
      where: { id: originSchoolId },
      select: { id: true, type: true },
    });

    if (!originSchool)
      throw new NotFoundException('La escuela de origen no existe');

    const careerOffered = await this.prisma.careerOffered.findUnique({
      where: { id: careerOfferedId },
      select: { id: true },
    });

    if (!careerOffered)
      throw new NotFoundException('La carrera ofrecida no existe');

    try {
      const studentId = uuid();

      const studentToInsert = this.prisma.student.create({
        data: {
          id: studentId,
          dni: createEnrollmentDto.dni,
          names: createEnrollmentDto.names,
          surnames: createEnrollmentDto.surnames,
          email: createEnrollmentDto.email,
          originSchoolId: createEnrollmentDto.originSchoolId,
        },
      });

      const baseEnrollmentFee = 100;

      const enrollmentFee =
        originSchool.type === 'FISCAL' || originSchool.type === 'FISCOMISIONAL'
          ? baseEnrollmentFee - baseEnrollmentFee * 0.03
          : baseEnrollmentFee;

      const enrollmentToInsert = this.prisma.enrollment.create({
        data: {
          studentId,
          careerOfferedId: createEnrollmentDto.careerOfferedId,
          enrollmentFee,
        },
      });

      await this.prisma.$transaction([studentToInsert, enrollmentToInsert]);

      return { message: 'Matrícula creada correctamente' };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Ocurrió un error inesperado');
    }
  }

  findAll() {
    return `This action returns all enrollment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    console.log(updateEnrollmentDto);

    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
