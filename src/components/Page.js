import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar'
import Container from '@mui/material/Container';

export default function Page({children}) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <header className="App-header">
                    <Navbar tabs={[
                        {
                            text: 'Dashboard',
                            url: '/'
                        },
                        {
                            text: 'Map',
                            url: '/map'
                        }
                    ]}/>
                    <p>
                        CapDragons
                    </p>
                    <div className="spacer"></div>
                </header>
                <Container maxWidth="sm">
                    {children}
                </Container>
            </div>
        </ThemeProvider>
    );
}