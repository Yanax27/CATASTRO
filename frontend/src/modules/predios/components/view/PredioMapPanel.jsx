import React, { useEffect, useMemo } from "react";
import {
  GeoJSON,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const MapBoundsController = ({ geojson }) => {
  const map = useMap();

  useEffect(() => {
    if (!geojson) return;

    const layer = L.geoJSON(geojson);
    const bounds = layer.getBounds();

    if (!bounds.isValid()) return;

    // Ajusta al polígono
    map.fitBounds(bounds, {
      padding: [40, 40],
      animate: false,
    });

    // Luego aleja un poco más la vista
    setTimeout(() => {
      const currentZoom = map.getZoom();
      map.setZoom(Math.max(currentZoom - 2, 17));
    }, 50);

    // Limitar navegación a una zona más amplia alrededor
    const expandedBounds = bounds.pad(5);
    map.setMaxBounds(expandedBounds);
  }, [geojson, map]);

  return null;
};

const getPolygonCenter = (geojson) => {
  try {
    const layer = L.geoJSON(geojson);
    const bounds = layer.getBounds();

    if (!bounds.isValid()) {
      return [-21.53, -64.73];
    }

    const center = bounds.getCenter();
    return [center.lat, center.lng];
  } catch {
    return [-21.53, -64.73];
  }
};

const PredioMapPanel = ({ predio }) => {
  const geojson = predio?.shape_geojson || null;

  const center = useMemo(() => {
    if (!geojson) return [-21.53, -64.73];
    return getPolygonCenter(geojson);
  }, [geojson]);

  if (!geojson) {
    return (
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 h-[420px] flex items-center justify-center">
        <p className="text-slate-400">
          No hay geometría disponible para este predio.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold mb-3 text-slate-800 dark:text-white">
        Delimitación del predio
      </h3>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <MapContainer
          center={center}
          zoom={18}
          minZoom={18}
          maxZoom={20}
          maxBoundsViscosity={1.0}
          scrollWheelZoom={true}
          style={{ height: "420px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON
            data={geojson}
            style={{
              color: "#dc2626",
              weight: 3,
              opacity: 1,
              fillColor: "#ef4444",
              fillOpacity: 0.25,
            }}
          />

          <MapBoundsController geojson={geojson} />
        </MapContainer>
      </div>
    </div>
  );
};

export default PredioMapPanel;