import { CreateSnippetTagDto } from '../snippet-tag/snippet-tag.types';

export interface UpdateSnippetDto {
  label?: string;
  content?: string;
}

export interface CreateSnippetDto {
  label: string;
  content: string;
  tags: CreateSnippetTagDto[];
}
