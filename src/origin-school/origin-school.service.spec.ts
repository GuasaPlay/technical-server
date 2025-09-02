import { Test, TestingModule } from '@nestjs/testing';
import { OriginSchoolService } from './origin-school.service';

describe('OriginSchoolService', () => {
  let service: OriginSchoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OriginSchoolService],
    }).compile();

    service = module.get<OriginSchoolService>(OriginSchoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
