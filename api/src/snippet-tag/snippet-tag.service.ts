import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Snippet } from '../snippet/snippet.entity';
import { Repository } from 'typeorm';
import { SnippetTag } from './snippet-tag.entity';
import { CreateSnippetTagDto } from './snippet-tag.types';
import { betterRepository, BetterRepository } from '../utils/BetterRepository';
import { makeHttpException } from '../utils/http-response';

@Injectable()
export class SnippetTagService {
  private readonly snippetTagRepository: BetterRepository<SnippetTag>;
  constructor(
    @InjectRepository(SnippetTag)
    private __base_repo__: Repository<SnippetTag>,
  ) {
    this.snippetTagRepository = betterRepository(__base_repo__);
  }

  async findAll(snippet: Snippet): Promise<SnippetTag[]> {
    return await this.snippetTagRepository.find({
      where: { snippet },
      relations: { snippet: false },
    });
  }

  async findOne(snippet: Snippet, id: number): Promise<SnippetTag> {
    return await this.snippetTagRepository.findOneOrFailWithHttpException(
      {
        where: { snippet, id },
        relations: { snippet: false },
      },
      HttpStatus.NOT_FOUND,
      'SNIPPET-TAG:NOT_FOUND',
    );
  }

  async createTag(
    snippet: Snippet,
    createSnippetTagDto: CreateSnippetTagDto,
  ): Promise<SnippetTag> {
    let tag = this.snippetTagRepository.create();
    tag.name = createSnippetTagDto.name;
    tag.snippet = snippet;
    tag = await this.snippetTagRepository.save(tag);
    delete tag.snippet;
    return tag;
  }

  async removeTag(snippet: Snippet, id: number): Promise<void> {
    const tag = await this.snippetTagRepository.findOneOrFailWithHttpException(
      { where: { snippet, id }, relations: { snippet: false } },
      HttpStatus.NOT_FOUND,
      'SNIPPET-TAG:NOT_FOUND',
    );
    await this.snippetTagRepository.remove(tag);
  }
}
