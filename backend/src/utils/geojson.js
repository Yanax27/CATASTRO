const proj4 = require("proj4");

// UTM 20S sobre WGS84
const EPSG_32720 =
  "+proj=utm +zone=20 +south +datum=WGS84 +units=m +no_defs";

// WGS84 geográfico
const EPSG_4326 = "EPSG:4326";

const reprojectCoordinate = (coord) => {
  if (!Array.isArray(coord) || coord.length < 2) return coord;

  const [x, y] = coord;
  const [lng, lat] = proj4(EPSG_32720, EPSG_4326, [x, y]);

  return [lng, lat];
};

const reprojectCoordinatesDeep = (coords) => {
  if (!Array.isArray(coords)) return coords;

  // Caso base: una coordenada [x, y]
  if (
    coords.length >= 2 &&
    typeof coords[0] === "number" &&
    typeof coords[1] === "number"
  ) {
    return reprojectCoordinate(coords);
  }

  return coords.map(reprojectCoordinatesDeep);
};

const reprojectGeoJSON = (geojson) => {
  if (!geojson || !geojson.type) return null;

  if (geojson.type === "Feature") {
    return {
      ...geojson,
      geometry: reprojectGeoJSON(geojson.geometry),
    };
  }

  if (geojson.type === "FeatureCollection") {
    return {
      ...geojson,
      features: geojson.features.map(reprojectGeoJSON),
    };
  }

  return {
    ...geojson,
    coordinates: reprojectCoordinatesDeep(geojson.coordinates),
  };
};

module.exports = {
  reprojectGeoJSON,
};