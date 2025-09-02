import { Test, TestingModule } from '@nestjs/testing';
import { CareerOfferedController } from './career-offered.controller';
import { CareerOfferedService } from './career-offered.service';

describe('CareerOfferedController', () => {
  let controller: CareerOfferedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerOfferedController],
      providers: [CareerOfferedService],
    }).compile();

    controller = module.get<CareerOfferedController>(CareerOfferedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
