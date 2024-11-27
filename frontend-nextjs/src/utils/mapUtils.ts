export const calculateMapZoom = (distance: number): number => {
  const zoomLevels = [
    { maxDistance: 4000, zoom: 14 },
    { maxDistance: 10000, zoom: 13 },
    { maxDistance: 20000, zoom: 11 },
    { maxDistance: 80000, zoom: 10 },
    { maxDistance: 130000, zoom: 9 },
  ];
  const level = zoomLevels.find((level) => distance < level.maxDistance);
  return level ? level.zoom : 7;
};

export const decodePolyline = (encoded: string): [number, number][] => {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let byte;
    let shift = 0;
    let result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
};

export const calculateMidpoint = (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
): [number, number] => {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;
  const toDegrees = (radian: number) => (radian * 180) / Math.PI;

  const lat1 = toRadians(origin.latitude);
  const lon1 = toRadians(origin.longitude);
  const lat2 = toRadians(destination.latitude);
  const lon2 = toRadians(destination.longitude);

  const dLon = lon2 - lon1;

  const Bx = Math.cos(lat2) * Math.cos(dLon);
  const By = Math.cos(lat2) * Math.sin(dLon);

  const midLat = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + Bx) ** 2 + By ** 2)
  );

  const midLon = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

  return [toDegrees(midLat), toDegrees(midLon)];
};
