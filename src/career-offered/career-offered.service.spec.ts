import { Test, TestingModule } from '@nestjs/testing';
import { CareerOfferedService } from './career-offered.service';

describe('CareerOfferedService', () => {
  let service: CareerOfferedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareerOfferedService],
    }).compile();

    service = module.get<CareerOfferedService>(CareerOfferedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
