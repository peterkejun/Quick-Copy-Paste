import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SnippetTagService } from 'src/snippet-tag/snippet-tag.service';
import { CreateSnippetTagDto } from 'src/snippet-tag/snippet-tag.types';
import { User_ } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto, UpdateSnippetDto } from './snippet.types';

@Controller('snippet')
export class SnippetController {
  constructor(
    private readonly snippetService: SnippetService,
    private readonly snippetTagService: SnippetTagService,
  ) {}

  @Get('/')
  async findAll(@User_() user: User) {
    return this.snippetService.findAll(user);
  }

  @Get('/:id')
  async findOne(@User_() user: User, @Param('id') id: number) {
    return this.snippetService.findOne(user, id);
  }

  @Post('/')
  async create(
    @User_() user: User,
    @Body() createSnippetDto: CreateSnippetDto,
  ) {
    const snippet = await this.snippetService.create(user, createSnippetDto);
    return snippet;
  }

  @Post('/:id')
  async update(
    @User_() user: User,
    @Param('id') id: number,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    const snippet = await this.snippetService.update(
      user,
      id,
      updateSnippetDto,
    );
    return snippet;
  }

  @Delete('/:id')
  async remove(@User_() user: User, @Param('id') id: number) {
    await this.snippetService.remove(user, id);
  }

  @Get('/:snippetId/tag')
  async findTags(@User_() user: User, @Param('snippetId') snippetId: number) {
    const snippet = await this.snippetService.findOne(user, snippetId);
    return await this.snippetTagService.findAll(snippet);
  }

  @Get('/:snippetId/tag/:tagId')
  async findTagById(
    @User_() user: User,
    @Param('snippetId') snippetId: number,
    @Param('tagId') tagId: number,
  ) {
    const snippet = await this.snippetService.findOne(user, snippetId);
    return await this.snippetTagService.findOne(snippet, tagId);
  }

  @Post('/:snippetId/tag')
  async createTag(
    @User_() user: User,
    @Param('snippetId') snippetId: number,
    @Body() createTagDto: CreateSnippetTagDto,
  ) {
    const snippet = await this.snippetService.findOne(user, snippetId);
    const tag = await this.snippetTagService.createTag(snippet, createTagDto);
    return tag;
  }

  @Delete('/:snippetId/tag/:tagId')
  async removeTag(
    @User_() user: User,
    @Param('snippetId') snippetId: number,
    @Param('tagId') tagId: number,
  ) {
    const snippet = await this.snippetService.findOne(user, snippetId);
    await this.snippetTagService.removeTag(snippet, tagId);
  }
}
