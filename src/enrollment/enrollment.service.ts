import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      const {
        dni,
        names,
        surnames,
        email,
        originSchoolId,
        courseOfferedId,
        enrollmentFee,
      } = createEnrollmentDto;
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
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
