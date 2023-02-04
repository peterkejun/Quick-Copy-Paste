import { Locale } from './locale'

export interface SnippetTag {
    id: number
    name: string
}
export interface Snippet {
    id: number
    label: string
    content: string
    tags: SnippetTag[]
}

export interface Language {
    locale: Locale
    display: string
}
