import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../cssFiles/AITripPlanner.module.css"; // Import CSS module

const MapComponent = ({ places }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        pane: 'tilePane'
      }).addTo(mapInstance.current);

      const tilePane = mapInstance.current.getPane('tilePane');
      if (tilePane) {
        tilePane.style.zIndex = 1;
        tilePane.style.opacity = 1;
      }

    } else if (!mapRef.current) {
      return;
    }

    const currentMap = mapInstance.current;

    currentMap.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        currentMap.removeLayer(layer);
      }
    });

    let validBounds = false;
    let bounds = L.latLngBounds();

    places.forEach((place) => {
      const { name, latitude, longitude } = place;
      if (typeof latitude === 'number' && typeof longitude === 'number' && !isNaN(latitude) && !isNaN(longitude)) {
        L.marker([latitude, longitude])
          .addTo(currentMap)
          .bindPopup(`<b>${name}</b>`);
        bounds.extend([latitude, longitude]);
        validBounds = true;
      } else {
        console.warn(`Skipping marker for ${name} due to invalid coordinates: Lat=${latitude}, Lng=${longitude}`);
      }
    });

    if (validBounds) {
      try {
        currentMap.fitBounds(bounds);
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    } else {
      console.log("No valid coordinates to fit bounds, setting default view.");
      currentMap.setView([51.505, -0.09], 2);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [places]);

  return <div ref={mapRef} className={styles.mapContainer}></div>;
};

export default MapComponent;