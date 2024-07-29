export const haversine = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  // Radius of the Earth in meters
  const R = 6371000.0;

  // Convert latitude and longitude from degrees to radians
  const [radLat1, radLon1, radLat2, radLon2] = [lat1, lon1, lat2, lon2].map(
    (coord) => (coord * Math.PI) / 180
  );

  // Calculate differences in coordinates
  const dlat = radLat2 - radLat1;
  const dlon = radLon2 - radLon1;

  // Haversine formula
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in meters
  const distanceInMeters = R * c;

  // Convert distance to kilometers
  const distanceInKilometers = distanceInMeters / 1000;

  return distanceInKilometers;
};
