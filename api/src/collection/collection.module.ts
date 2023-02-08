import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from '../snippet/snippet.entity';
import { User } from '../user/user.entity';
import { Collection } from './collection.entity';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, Snippet, User])],
  providers: [CollectionService],
  exports: [TypeOrmModule, CollectionService],
  controllers: [CollectionController],
})
export class CollectionModule {}
