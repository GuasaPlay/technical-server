import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OriginSchoolService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      const originSchools = await this.prisma.originSchool.findMany({
        select: {
          id: true,
          name: true,
          type: true,
        },
      });
      return originSchools;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las escuelas de origen',
      );
    }
  }
}
