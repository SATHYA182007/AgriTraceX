"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface ParcelMapProps {
  parcels: any[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function ParcelMap({ parcels, center = [19.4, 80.0], zoom = 12, height = "400px" }: ParcelMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height }} className="bg-muted animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>;

  const getColor = (health: string) => {
    switch(health) {
      case 'good': return '#4A6741'; // sage
      case 'watch': return '#E8A838'; // amber
      case 'alert': return '#ef4444'; // red
      default: return '#4A6741';
    }
  };

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden border border-border shadow-sm">
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%", zIndex: 0 }}>
        {/* Muted OSM layer for aesthetic */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapUpdater center={center} zoom={zoom} />
        
        {parcels.map((p, i) => {
          // Dummy polygon if not provided
          const positions: [number, number][] = p.boundary || [
            [p.lat - 0.005, p.lng - 0.005],
            [p.lat + 0.005, p.lng - 0.005],
            [p.lat + 0.005, p.lng + 0.005],
            [p.lat - 0.005, p.lng + 0.005],
          ];
          
          return (
            <Polygon 
              key={p.id || i} 
              positions={positions} 
              pathOptions={{ 
                color: getColor(p.health || 'good'), 
                fillColor: getColor(p.health || 'good'),
                fillOpacity: 0.4,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-sora font-semibold text-sm">{p.name || 'Parcel'}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Crop: {p.crop_type || 'Unknown'}</p>
                  <p className="text-xs text-muted-foreground">Area: {p.area_ha || 0} ha</p>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
}
