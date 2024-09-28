import Page from '../components/Page'
import Box from '@mui/material/Box';

export default function Map() {
    return (
        <Page>
            <Box
                component="section"
                sx={{
                    height: 400,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
            />
        </Page>
    );
}