import { ContentCopy } from '@mui/icons-material'
import {
    Paper,
    Typography,
    Stack,
    Alert,
    Snackbar,
    Box,
    TextField,
} from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useText } from '../../hooks/useText'
import { SnippetTag } from '../../models/types'
import { useAppDispatch } from '../../redux/hooks'
import { addTag, deleteTag, editSnippet } from '../../redux/slices/snippetSlice'
import { ChipList } from '../../utils/ChipList/ChipList'
import { getCurrentTimestamp } from '../../utils/utils'
import { ConfirmButton } from '../ConfirmButton/ConfirmButton'
import { ContentTextfieldProps, SnippetProps } from './Snippet.types'

const ContentTextfield = (props: ContentTextfieldProps) => {
    const [content, setContent] = useState(props.content)
    const timestamp = useRef(0)
    const text__typeContent = useText('SNIPPET:type-to-add-content')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const currentTimestamp = getCurrentTimestamp()
        timestamp.current = currentTimestamp
        setContent(e.target.value)
        setTimeout(() => {
            if (timestamp.current === currentTimestamp) {
                props.onChange(content)
            }
        }, props.changeDelay)
    }
    useEffect(() => {
        setContent(props.content)
    }, [props.content])
    return (
        <TextField
            variant="standard"
            style={{ outline: 'none' }}
            placeholder={text__typeContent}
            value={content}
            onChange={handleChange}
        />
    )
}

export const Snippet = (props: SnippetProps) => {
    const [openNotif, setOpenNotif] = useState(false)
    const text__noPermission = useText('CLIPBOARD:no-write-permission')
    const text__copied = useText('CLIPBOARD:write-success')

    const [notif, setNotif] = useState<string>(text__copied)
    const dispatch = useAppDispatch()
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(props.snippet.content)
            setNotif(text__copied)
        } catch {
            setNotif(text__noPermission)
        } finally {
            setOpenNotif(true)
        }
    }
    const toggleNotification = () => {
        setOpenNotif(!openNotif)
    }
    const handleAddTag = (name: string) => {
        const tag: SnippetTag = {
            id: -1,
            name,
        }
        dispatch(
            addTag({
                snippetId: props.snippet.id,
                tag,
            })
        )
    }
    const handleDeleteTag = (index: number) => {
        const tag = props.snippet.tags[index]
        dispatch(
            deleteTag({
                tag,
                snippetId: props.snippet.id,
            })
        )
    }
    const handleContentChange = (content: string) => {
        dispatch(
            editSnippet({
                snippet: {
                    ...props.snippet,
                    content,
                },
            })
        )
    }
    return (
        <>
            <Snackbar
                open={openNotif}
                autoHideDuration={2000}
                onClose={toggleNotification}
            >
                <Alert
                    onClose={toggleNotification}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {notif}
                </Alert>
            </Snackbar>
            <Paper elevation={3} style={{ margin: '1rem' }}>
                <Box margin="1rem">
                    <Typography variant="h5">{props.snippet.label}</Typography>
                    <ChipList
                        chips={props.snippet.tags.map((tag) => tag.name)}
                        onAdd={handleAddTag}
                        onDelete={handleDeleteTag}
                    />
                    <Box
                        bgcolor={'primary.main'}
                        marginTop="5px"
                        padding="0.2rem 0.5rem"
                        borderRadius="5px"
                    >
                        <Stack direction="row" alignItems="center">
                            <ContentTextfield
                                content={props.snippet.content}
                                changeDelay={1000}
                                onChange={handleContentChange}
                            />
                            <Box flexGrow={1} />
                            <ConfirmButton
                                confirmTimeout={1000}
                                onClick={copy}
                                icon={<ContentCopy />}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}
