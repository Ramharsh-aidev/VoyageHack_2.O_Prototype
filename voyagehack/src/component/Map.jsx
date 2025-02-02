import React from 'react';
import GoogleMapReact from 'google-map-react';
import Rating from '@mui/material/Rating'; // Keep MUI Rating for now, or replace with Tailwind stars
import mapStyles from '../mapStyles';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const isDesktop = window.innerWidth >= 640; // Simple breakpoint for desktop

  return (
    <div className="w-full h-[85vh] relative">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <div
            className="absolute transform translate-x-[-50%] translate-y-[-50%] z-10 hover:z-20 cursor-pointer"
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop
              ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-500"> <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.012a.775.775 0 01.022.012l.07.041 1.428.844a.75.75 0 01-.798 1.31l-1.445-.857-1.445.857a.75.75 0 01-.798-1.31l1.428-.844.022-.012.028-.012.07-.041.07-.04a16.97 16.97 0 014.873-1.266c.162.024.324.048.485.072.197.028.395.056.592.08.082.008.164.016.246.024.08.008.16.017.24.025.104.01.207.02.311.03a.75.75 0 01.789.77l-.006 1.745a.75.75 0 01-.757.746c-.085 0-.17-.002-.255-.006a24.747 24.747 0 01-1.84-1.556c-.592-.48-1.227-.96-1.9-.96-.673 0-1.308.48-1.9.96a24.747 24.747 0 01-1.84 1.556c-.085.004-.17.006-.255.006a.75.75 0 01-.757-.746l-.006-1.745a.75.75 0 01.789-.77c.104-.01.207-.02.311-.03.08-.008.16-.017.24-.025.082-.008.164-.016.246-.024.197-.028.395-.056.592-.08.162-.024.324-.048.485-.072a16.97 16.97 0 014.873 1.266zM12 3.75a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" clipRule="evenodd" /> </svg>
              : (
                <div className="bg-white p-2 rounded-md shadow-md w-28">
                  <p className="text-sm font-semibold mb-1 truncate">{place.name}</p>
                  <img
                    className="w-full h-20 object-cover rounded-md mb-1"
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly className="text-xs" />
                </div>
              )}
          </div>
        ))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt={`Weather icon for ${data.name}`} />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;