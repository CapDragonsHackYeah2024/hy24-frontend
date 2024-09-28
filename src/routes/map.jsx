import Page from '../components/Page'
import Box from '@mui/material/Box';
import MapPolygon from '../components/MapPolygon'

export default function Map() {
    return (
        <Page>
            <Box
                component="section"
                sx={{
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
            >
                <MapPolygon/>
            </Box>
        </Page>
    );
}