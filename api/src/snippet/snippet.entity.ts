import { SnippetTag } from '../snippet-tag/snippet-tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Collection } from '../collection/collection.entity';

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  content: string;

  @OneToMany(() => SnippetTag, (tag) => tag.snippet)
  tags: SnippetTag[];

  @ManyToOne(() => Collection, (collection) => collection.snippets)
  collection: Collection;
}
