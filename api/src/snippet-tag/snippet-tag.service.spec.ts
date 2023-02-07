import { Test, TestingModule } from '@nestjs/testing';
import { SnippetTagService } from './snippet-tag.service';

describe('SnippetTagService', () => {
  let service: SnippetTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnippetTagService],
    }).compile();

    service = module.get<SnippetTagService>(SnippetTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
