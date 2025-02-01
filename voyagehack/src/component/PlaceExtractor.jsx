import { useState, useEffect } from "react";
import axios from "axios";

const PlaceExtractor = ({ aiResponseText, onPlacesExtracted }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (aiResponseText) {
      extractPlaces(aiResponseText);
    }
  }, [aiResponseText]);


  const apiKey= process.env.REACT_APP_GEMINI_API_KEY_Extrc;

  const extractPlaces = async (responseText) => {
    setLoading(true);
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${apiKey}`, // Assuming 'apiKey' is defined in AITripPlanner
        method: "post",
        data: {
          contents: [{ parts: [{ text: `Extract all locations, place names, tourist attractions, and hotel names from the following text and return them as a comma-separated list. Text: ${responseText}` }] }],
        },
      });

      const extractedPlaceNamesText = response.data.candidates[0].content.parts[0].text;
      const extractedPlaceNames = extractedPlaceNamesText.split(",").map(place => place.trim()).filter(place => place !== "");

      const placesWithCoordinates = await geocodePlaces(extractedPlaceNames);
      onPlacesExtracted(placesWithCoordinates);

    } catch (error) {
      console.error("Error extracting places:", error);
    } finally {
      setLoading(false);
    }
  };

  const geocodePlaces = async (placeNames) => {
    const geocodedPlaces = [];
    for (const name of placeNames) {
      try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name)}&format=json&limit=1`;
        const geocodingResponse = await axios.get(nominatimUrl);

        if (geocodingResponse.data && geocodingResponse.data.length > 0) {
          const locationData = geocodingResponse.data[0];
          geocodedPlaces.push({
            name: name,
            latitude: parseFloat(locationData.lat),
            longitude: parseFloat(locationData.lon),
          });
        } else {
          console.warn(`Geocoding failed for: ${name} using Nominatim`);
          geocodedPlaces.push({ name: name });
        }
      } catch (error) {
        console.error("Geocoding error for:", name, "using Nominatim", error);
        geocodedPlaces.push({ name: name });
      }
    }
    return geocodedPlaces;
  };

  return (
    <div>
      {loading ? <p>Loading places...</p> : null}
    </div>
  );
};

export default PlaceExtractor;