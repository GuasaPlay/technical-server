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
}
