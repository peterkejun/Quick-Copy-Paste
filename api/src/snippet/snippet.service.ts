import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SnippetTagService } from '../snippet-tag/snippet-tag.service';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Snippet } from './snippet.entity';
import { CreateSnippetDto, UpdateSnippetDto } from './snippet.types';
import { makeHttpException } from 'src/utils/http-response';
import { betterRepository, BetterRepository } from 'src/utils/BetterRepository';
import { isNullish } from 'src/utils/nullish';

@Injectable()
export class SnippetService {
  private readonly snippetRepository: BetterRepository<Snippet>;
  constructor(
    @InjectRepository(Snippet)
    private __snippet_repo__: Repository<Snippet>,
    private readonly snippetTagService: SnippetTagService,
  ) {
    this.snippetRepository = betterRepository(__snippet_repo__);
  }

  async findAll(user: User): Promise<Snippet[]> {
    return await this.snippetRepository.find({
      where: { user },
      relations: { tags: true },
    });
  }

  async findOne(user: User, id: number): Promise<Snippet> {
    const snippet = await this.snippetRepository.findOneOrFailWithException(
      {
        where: { user, id },
        relations: { tags: true },
      },
      makeHttpException(HttpStatus.NOT_FOUND, 'SNIPPET:NOT_FOUND'),
    );
    return snippet;
  }

  async create(
    user: User,
    createSnippetDto: CreateSnippetDto,
  ): Promise<Snippet> {
    let snippet = this.snippetRepository.create();
    snippet.label = createSnippetDto.label;
    snippet.content = createSnippetDto.content;
    snippet.user = user;
    snippet = await this.snippetRepository.save(snippet);
    const tags = await Promise.all(
      createSnippetDto.tags.map((tagDto) =>
        this.snippetTagService.createTag(snippet, tagDto),
      ),
    );
    snippet.tags = tags;
    snippet = await this.snippetRepository.save(snippet);
    delete snippet.user;
    return snippet;
  }

  async update(
    user: User,
    id: number,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<Snippet> {
    const snippet = await this.snippetRepository.findOneOrFailWithException(
      { where: { user, id }, relations: { tags: true, user: false } },
      makeHttpException(HttpStatus.NOT_FOUND, 'SNIPPET:NOT_FOUND'),
    );
    if (
      !isNullish(updateSnippetDto.label) &&
      updateSnippetDto.label.length > 0
    ) {
      snippet.label = updateSnippetDto.label;
    }
    if (!isNullish(updateSnippetDto.content)) {
      snippet.content = updateSnippetDto.content;
    }
    this.snippetRepository.save(snippet);
    return snippet;
  }

  async remove(user: User, id: number): Promise<void> {
    const snippet = await this.snippetRepository.findOneOrFailWithException(
      {
        where: { user, id },
      },
      makeHttpException(HttpStatus.NOT_FOUND, 'SNIPPET:NOT_FOUND'),
    );
    await this.snippetRepository.remove(snippet);
  }
}
