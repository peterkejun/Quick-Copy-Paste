import { createSlice } from '@reduxjs/toolkit'
import { Snippet, SnippetTag } from '../../models/types'
import { RootState } from '../store'

const noSnippets: Snippet[] = [
    {
        id: 1,
        label: 'First Snippet',
        content: 'Hello World!',
        tags: [
            {
                id: 1,
                name: 'Test',
            },
            {
                id: 2,
                name: 'First',
            },
        ],
    },
]

const createEmptySnippet = () => {
    return {
        id: -1,
        label: 'My Snippet',
        content: '',
        tags: [],
    }
}

export const snippetSlice = createSlice({
    name: 'snippets',
    initialState: noSnippets,
    reducers: {
        addTemplateSnippet: (state) => {
            const snippet = createEmptySnippet()
            state.unshift(snippet)
        },
        editSnippet: (state, action) => {
            const snippet = action.payload.snippet as Snippet
            const index = state.findIndex((s) => s.id === snippet.id)
            if (index > 0) {
                state[index].content = snippet.content
                state[index].label = snippet.label
            }
        },
        addTag: (state, action) => {
            const tag = action.payload.tag as SnippetTag
            tag.id = Date.now()
            const snippetId = action.payload.snippetId as number
            state.find((snippet) => snippet.id === snippetId)?.tags.push(tag)
        },
        deleteTag: (state, action) => {
            const tag = action.payload.tag as SnippetTag
            const snippetId = action.payload.snippetId as number
            const index = state.findIndex((snippet) => snippet.id === snippetId)
            if (index >= 0) {
                state[index].tags = state[index].tags.filter(
                    (t) => t.id != tag.id
                )
            }
        },
    },
})

export const selectSnippets = (state: RootState): Snippet[] => state.snippets
export const { addTag, deleteTag, addTemplateSnippet, editSnippet } =
    snippetSlice.actions
export default snippetSlice.reducer
