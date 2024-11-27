`use client`
import { useAppSelector } from '@/store';
import { decodePolyline } from '@/utils/mapUtils';
import React, { useEffect, useState } from 'react';

const StaticMap = (): JSX.Element => {
    const { estimatedRide } = useAppSelector((state) => state.rides);
    const apiKey = 'AIzaSyDQPvN8EB_tldE5S2L_1Ka1gv0lPK76B_E';

    const formatCoordinates = ({ latitude, longitude }: { latitude: number, longitude: number }): string => {
        return `${latitude},${longitude}`;
    };

    const generateMapUrl = (pathPoints: { latitude: number, longitude: number }[], startPoint: string, endPoint: string): string => {
        const pathPointsString = pathPoints
            .map((point) => formatCoordinates(point))
            .join('|');
        return `https://maps.googleapis.com/maps/api/staticmap?size=400x400
            &path=color:blue|weight:5|${pathPointsString}
            &markers=color:green|label:A|${startPoint}
            &markers=color:red|label:B|${endPoint}
            &key=${apiKey}`;
    };

    const pathPoints = decodePolyline(estimatedRide.routeResponse.routes[0].polyline.encodedPolyline);
    const startPoint = formatCoordinates(estimatedRide.origin);
    const endPoint = formatCoordinates(estimatedRide.destination);

    const mapUrl = generateMapUrl(pathPoints, startPoint, endPoint);

    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>
                <img
                    src={mapUrl}
                    alt="Mapa Estático com Rota"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </>
    );
};

export default StaticMap;
