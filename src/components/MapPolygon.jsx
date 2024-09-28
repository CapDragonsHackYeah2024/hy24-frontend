import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import EventForm from './EventForm';

const containerStyle = {
    width: '100%',
    height: '800px',
};

const center = {
    lat: 50.067786692535236,
    lng: 19.9915564349273,
};

const defaultZoomLevel = 16;

const MapPolygon = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBp7LbKYjxqdQR022-TfAXBIIRUjN8ChVk',
        version: 'weekly',
    });
    
    const [markerPosition, setMarkerPosition] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState({top: 200, left: 200});
    const [openPopover, setOpenPopover] = useState(false)

    const handleClose = () => {
        setAnchorEl({top: 300, left: 300});
        setOpenPopover(false);
    };

    const handleMapClick = (event) => {
        // Get the latitude and longitude where the user clicked
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Set the marker position
        setMarkerPosition({ lat, lng });

        // Log the coordinates to the console
        console.log(`Marker placed at: Latitude: ${lat}, Longitude: ${lng}`);

        setAnchorEl({top: event.domEvent.clientY, left: event.domEvent.clientX});
        setOpenPopover(true);
    };
    

    const onLoad = useCallback(function callback(mapInstance) {
        mapInstance.setZoom(defaultZoomLevel);
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(function callback(mapInstance) {
        setMap(null);
    }, []);
    
    const id = openPopover ? 'simple-popover' : undefined;

    return isLoaded ? (
        <>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapTypeId="hybrid"
            onClick={handleMapClick}
        >
            {/* Render the marker when markerPosition is available */}
            {markerPosition && (
                <Marker position={markerPosition} />
            )}
        </GoogleMap>
        <Popover
            id={id}
            open={openPopover}
            anchorReference="anchorPosition"
            anchorPosition={{ top: anchorEl.top, left: anchorEl.left }}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Button onClick={handleClose}>Close me!</Button>
            <EventForm coordinates={markerPosition} />
        </Popover>
        </>
    ) : <></>;
};

export default React.memo(MapPolygon);