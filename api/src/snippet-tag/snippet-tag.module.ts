import { Module } from '@nestjs/common';
import { SnippetTagService } from './snippet-tag.service';
import { SnippetTagController } from './snippet-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetTag } from './snippet-tag.entity';
import { Snippet } from '../snippet/snippet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SnippetTag, Snippet])],
  providers: [SnippetTagService],
  controllers: [SnippetTagController],
  exports: [TypeOrmModule, SnippetTagService],
})
export class SnippetTagModule {}
