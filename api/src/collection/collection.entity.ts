import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Snippet } from '../snippet/snippet.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Snippet, (snippet) => snippet.collection)
  snippets: Snippet[];

  @ManyToOne(() => User, (user) => user.collections)
  @Exclude()
  user: User;
}
