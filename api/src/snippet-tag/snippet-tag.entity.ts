import { Snippet } from '../snippet/snippet.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class SnippetTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Snippet, (snippet) => snippet.tags)
  snippet: Snippet;
}
