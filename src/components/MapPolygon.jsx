import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {postData} from "../services/service";

const containerStyle = {
    width: '800px',
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

    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);

    const handleMapClick = (event) => {
        // Get the latitude and longitude where the user clicked
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Set the marker position
        setMarkerPosition({ lat, lng });

        // Log the coordinates to the console
        console.log(`Marker placed at: Latitude: ${lat}, Longitude: ${lng}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            coordinates: [[...markerPosition.lat, markerPosition.lng]],
            eventType,
            eventDate,
            description
        }

        postData(`https://capdragons.koyeb.app/api/v1/events`, JSON.stringify(data))
            .then(res => {
                const {status} = res;
                if (status.toString().startsWith("4")) {
                    console.log("error")
                } else {
                   console.log("POSTED!")
                }
            })
            .catch(e => console.log(e));
    }

    const onLoad = useCallback(function callback(mapInstance) {
        mapInstance.setZoom(defaultZoomLevel);
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(function callback(mapInstance) {
        setMap(null);
    }, []);

    return isLoaded ? (
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
    ) : <></>;
};

export default React.memo(MapPolygon);