import { Test, TestingModule } from '@nestjs/testing';
import { ChroniclesService } from './chronicles.service';

describe('ChroniclesService', () => {
  let service: ChroniclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChroniclesService],
    }).compile();

    service = module.get<ChroniclesService>(ChroniclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
