import { useAppSelector } from '../../store';
import { Polyline, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { decodePolyline, calculateMidpoint, calculateMapZoom } from '../../utils/mapUtils';
import 'leaflet/dist/leaflet.css';
// import MapMarkerWithPopup from '../MapMarkerWithPopup';

const StaticMap = (): JSX.Element => {
    const ridesData = useAppSelector((state) => state.rides);
    const [mapData, setMapData] = useState<{
        center: [number, number];
        zoom: number;
        polyline: [number, number][];
    } | null>(null);

    useEffect(() => {
        if (ridesData.estimatedRide) {
            const { origin, destination, distance, routeResponse } = ridesData.estimatedRide;
            const center = calculateMidpoint(origin, destination);
            const zoom = calculateMapZoom(distance);
            const polyline = decodePolyline(routeResponse.routes[0].polyline.encodedPolyline);
            setMapData({ center, zoom, polyline });
        }
    }, [ridesData.estimatedRide]);

    if (!ridesData.estimatedRide) return <div>Carregando...</div>;
    if (!mapData) return <div>Carregando...</div>;

    const { center, zoom, polyline } = mapData;

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            dragging={false}
            zoomControl={false}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarkerWithPopup
                position={[ridesData.estimatedRide.origin.latitude,
                ridesData.estimatedRide.origin.longitude]}
                text="Origem"
            />
            <MapMarkerWithPopup
                position={[ridesData.estimatedRide.destination.latitude,
                ridesData.estimatedRide.destination.longitude]}
                text="Destino"
            />
            <Polyline
                positions={polyline}
                color="blue"
            />
        </MapContainer>
    );
};

export default StaticMap;
