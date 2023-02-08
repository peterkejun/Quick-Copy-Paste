import { CreateSnippetTagDto } from '../snippet-tag/snippet-tag.types';

export interface UpdateSnippetDto {
  label?: string;
  content?: string;
}

export interface CreateSnippetDto {
  collectionId: number;
  label: string;
  content: string;
  tags: CreateSnippetTagDto[];
}
