import { Box } from '@mui/system'
import { PortalBar } from './PortalBar/PortalBar'
import { SnippetStack } from './SnippetStack/SnippetStack'

export const Portal = () => {
    return (
        <>
            <Box
                flexDirection={'row'}
                sx={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'background.default',
                }}
            >
                <PortalBar />
                <SnippetStack />
            </Box>
        </>
    )
}
