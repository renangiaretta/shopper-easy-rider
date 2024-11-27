import { IGeolocation } from '@/interfaces/maps.interface';

export const decodePolyline = (encoded: string): IGeolocation[] => {
    let points = [];
    let index = 0;
    const len = encoded.length;
    let latitude = 0,
        longitude = 0;

    while (index < len) {
        let b,
            shift = 0,
            result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dlat = result & 1 ? ~(result >> 1) : result >> 1;
        latitude += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dlng = result & 1 ? ~(result >> 1) : result >> 1;
        longitude += dlng;

        points.push({ latitude: latitude / 1e5, longitude: longitude / 1e5 });
    }

    return points;
};
