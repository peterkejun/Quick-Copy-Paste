import './App.css'
import { Portal } from './Portal/Portal'
import { ThemeProvider } from '@mui/material'
import theme from './theme'

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Portal />
            </ThemeProvider>
        </div>
    )
}

export default App
