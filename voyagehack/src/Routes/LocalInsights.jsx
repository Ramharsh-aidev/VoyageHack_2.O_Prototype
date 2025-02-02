import React, { useState, useEffect } from 'react';
import { getPlacesData, getWeatherData } from '../api/travelAdvisorAPI';
import Header from '../component/InsightsHeader';
import List from '../component/List';
import Map from '../component/Map';
import { GoogleMap, LoadScript } from '@react-google-maps/api'; // Import LoadScript

const googleMapsLibraries = ['places']; // Define the libraries you need

const LocalInsights = () => {
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState(null);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [places, setPlaces] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);
        setFilteredPlaces(filtered);
    }, [rating, places]);

    useEffect(() => {
        if (bounds) {
            setIsLoading(true);

            getWeatherData(coords.lat, coords.lng)
                .then((data) => setWeatherData(data));

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setRating('');
                    setIsLoading(false);
                });
        }
    }, [bounds, type, coords.lat, coords.lng]);

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place && place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setCoords({ lat, lng });
            }
        }
    };

    return (
        <>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} // **IMPORTANT: Add your API key here**
                libraries={googleMapsLibraries} // **IMPORTANT: Load the 'places' library**
            >
                <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
                    <div className="md:col-span-4">
                        <List
                            isLoading={isLoading}
                            childClicked={childClicked}
                            places={filteredPlaces.length ? filteredPlaces : places}
                            type={type}
                            setType={setType}
                            rating={rating}
                            setRating={setRating}
                        />
                    </div>
                    <div className="md:col-span-8 flex justify-center items-center">
                        <Map
                            setChildClicked={setChildClicked}
                            setBounds={setBounds}
                            setCoords={setCoords}
                            coords={coords}
                            places={filteredPlaces.length ? filteredPlaces : places}
                            weatherData={weatherData}
                        />
                    </div>
                </div>
            </LoadScript>
        </>
    );
};

export default LocalInsights;