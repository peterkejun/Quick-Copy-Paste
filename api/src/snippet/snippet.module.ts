import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { SnippetController } from './snippet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from './snippet.entity';
import { SnippetTagModule } from '../snippet-tag/snippet-tag.module';
import { SnippetTag } from '../snippet-tag/snippet-tag.entity';
import { SnippetTagService } from '../snippet-tag/snippet-tag.service';
import { UserModule } from '../user/user.module';
import { Collection } from '../collection/collection.entity';
import { CollectionModule } from '../collection/collection.module';
import { CollectionService } from '../collection/collection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Snippet, SnippetTag, Collection]),
    SnippetTagModule,
    UserModule,
    CollectionModule,
  ],
  providers: [SnippetService, SnippetTagService, CollectionService],
  controllers: [SnippetController],
  exports: [TypeOrmModule, SnippetService],
})
export class SnippetModule {}
