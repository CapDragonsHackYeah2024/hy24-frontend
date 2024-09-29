import Page from '../components/Page'
import Box from '@mui/material/Box';
import MapPolygon from '../components/MapPolygon'
import { getResource } from "../services/service";
import { useState, useEffect } from 'react';

export default function Map() {
    const [markers, setMarkers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded === false) {
            const data = getResource(`https://capdragons.koyeb.app/api/v1/events`)

            data.then((value) => {
                setMarkers(value);
                setLoaded(true)
            })
        }
    }, [loaded]);

    const refreshPage = () => {
        window.location.reload();
    }

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
                <MapPolygon markers={markers} callback={refreshPage}/>
            </Box>
        </Page>
    );
}