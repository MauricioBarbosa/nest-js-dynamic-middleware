import { Test, TestingModule } from '@nestjs/testing';
import { ChroniclesController } from './chronicles.controller';

describe('ChroniclesController', () => {
  let controller: ChroniclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChroniclesController],
    }).compile();

    controller = module.get<ChroniclesController>(ChroniclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
