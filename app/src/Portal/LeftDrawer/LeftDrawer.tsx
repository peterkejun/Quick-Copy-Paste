import { Drawer, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

const DrawerList = () => {
    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Paper elevation={0} sx={{ width: 256, borderRadius: 0 }}>
                <Typography variant="h5" color="primary">
                    Copy/Paste
                </Typography>
            </Paper>
        </Box>
    )
}

export const LeftDrawer = () => {
    return (
        <>
            <Drawer variant="permanent" open={true} anchor="left">
                <DrawerList />
            </Drawer>
        </>
    )
}
