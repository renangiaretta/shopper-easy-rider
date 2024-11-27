import React, { useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface MarkerWithPopupProps {
    position: [number, number];
    text: string;
}

const MapMarkerWithPopup: React.FC<MarkerWithPopupProps> = ({ position, text }: MarkerWithPopupProps): JSX.Element => {
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.bindPopup(text).openPopup();
        }
    }, [text]);

    return <Marker position={position} ref={markerRef}></Marker>;
};

export default MapMarkerWithPopup;
