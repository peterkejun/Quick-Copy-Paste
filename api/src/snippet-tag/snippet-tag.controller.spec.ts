import { Test, TestingModule } from '@nestjs/testing';
import { SnippetTagController } from './snippet-tag.controller';

describe('SnippetTagController', () => {
  let controller: SnippetTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetTagController],
    }).compile();

    controller = module.get<SnippetTagController>(SnippetTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
