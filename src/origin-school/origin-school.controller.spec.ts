import { Test, TestingModule } from '@nestjs/testing';
import { OriginSchoolController } from './origin-school.controller';
import { OriginSchoolService } from './origin-school.service';

describe('OriginSchoolController', () => {
  let controller: OriginSchoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginSchoolController],
      providers: [OriginSchoolService],
    }).compile();

    controller = module.get<OriginSchoolController>(OriginSchoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
