import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../cssFiles/AITripPlanner.module.css";
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure this is included


const MapComponent = ({ places }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (!mapInstance.current && mapRef.current) {
            // No need to set L.Icon.Default.imagePath anymore

            mapInstance.current = L.map(mapRef.current).setView([0, 0], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                pane: 'tilePane'
            }).addTo(mapInstance.current);
        } else if (!mapRef.current) {
            return;
        }

        const currentMap = mapInstance.current;

        // Clear existing markers
        currentMap.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                currentMap.removeLayer(layer);
            }
        });

        let validBounds = false;
        let bounds = L.latLngBounds();
        const markers = [];

        // Define a custom Leaflet Icon using Font Awesome
        const fontAwesomeIcon = L.divIcon({
            className: 'fontawesome-marker', // Optional class for styling
            html: `
                <div style="width: 24px; height: 24px; display: flex; justify-content: center; align-items: center;">
                    <i class="fas fa-map-pin" style="color: red; font-size: 24px;"></i>
                </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
        });


        places.forEach((place) => {
            const { name, latitude, longitude } = place;
            if (typeof latitude === 'number' && typeof longitude === 'number' && !isNaN(latitude) && !isNaN(longitude)) {
                const marker = L.marker([latitude, longitude], { icon: fontAwesomeIcon }) // Use the custom icon here
                    .bindPopup(`<b>${name}</b>`);
                markers.push({ marker, lat: latitude, lng: longitude });
                bounds.extend([latitude, longitude]);
                validBounds = true;
            } else {
                console.warn(`Skipping marker for ${name} due to invalid coordinates: Lat=${latitude}, Lng=${longitude}`);
            }
        });

        if (!validBounds) {
            console.log("No valid coordinates, setting default view.");
            currentMap.setView([0, 0], 2);
            return;
        }


        const gridDivisions = 20;
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        const latDiff = northEast.lat - southWest.lat;
        const lngDiff = northEast.lng - southWest.lng;

        const grid = [];
        for (let i = 0; i < gridDivisions; i++) {
            for (let j = 0; j < gridDivisions; j++) {
                const cellBounds = L.latLngBounds(
                    [southWest.lat + (latDiff * i / gridDivisions), southWest.lng + (lngDiff * j / gridDivisions)],
                    [southWest.lat + (latDiff * (i + 1) / gridDivisions), southWest.lng + (lngDiff * (j + 1) / gridDivisions)]
                );
                grid.push({ bounds: cellBounds, count: 0 });
            }
        }


        markers.forEach(m => {
            grid.forEach(cell => {
                if (cell.bounds.contains([m.lat, m.lng])) {
                    cell.count++;
                }
            });
        });


        let maxCount = 0;
        let densestCell = null;
        grid.forEach(cell => {
            if (cell.count > maxCount) {
                maxCount = cell.count;
                densestCell = cell;
            }
        });


        if (densestCell && maxCount > 0) {
            try {
                currentMap.flyToBounds(densestCell.bounds, { padding: [50, 50], maxZoom: 10 });
            } catch (error) {
                console.error("Error fitting bounds to densest cell:", error);
                currentMap.fitBounds(bounds);
            }
        } else {
            try {
                currentMap.fitBounds(bounds);
            } catch (error) {
                console.error("Error fitting overall bounds:", error);
                currentMap.setView([0, 0], 2);
            }
        }


        markers.forEach(m => {
            m.marker.addTo(currentMap);
        });


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