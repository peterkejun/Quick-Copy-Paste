import { Snippet } from '../../models/types'

export interface ContentTextfieldProps {
    content: string
    changeDelay: number
    onChange: (content: string) => void
}

export interface SnippetProps {
    snippet: Snippet
}
