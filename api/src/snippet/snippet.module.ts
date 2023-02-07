import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { SnippetController } from './snippet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from './snippet.entity';
import { SnippetTagModule } from '../snippet-tag/snippet-tag.module';
import { SnippetTag } from '../snippet-tag/snippet-tag.entity';
import { SnippetTagService } from '../snippet-tag/snippet-tag.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Snippet, SnippetTag]),
    SnippetTagModule,
    UserModule,
  ],
  providers: [SnippetService, SnippetTagService],
  controllers: [SnippetController],
  exports: [TypeOrmModule, SnippetService],
})
export class SnippetModule {}
