import { SnippetTag } from '../snippet-tag/snippet-tag.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

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

  @ManyToOne(() => User, (user) => user.snippets)
  @Exclude()
  user: User;
}
