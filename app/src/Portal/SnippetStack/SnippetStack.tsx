import { Paper, Stack } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { selectSnippets } from '../../redux/slices/snippetSlice'
import { Snippet } from '../Snippet/Snippet'

export const SnippetStack = () => {
    const snippets = useAppSelector(selectSnippets)
    return (
        <>
            <Paper elevation={3}>
                <Stack>
                    {snippets.map((snippet, index) => (
                        <Snippet snippet={snippet} key={index} />
                    ))}
                </Stack>
            </Paper>
        </>
    )
}
