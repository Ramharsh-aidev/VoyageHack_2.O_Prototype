import React from 'react';
import Rating from '@mui/material/Rating'; // Keep MUI Rating for now, or replace with Tailwind stars

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-72 object-cover"
        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        alt={place.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{place.name}</div>
        <div className="flex justify-between items-center mb-2">
          <Rating name="read-only" value={Number(place.rating)} readOnly size="small" />
          <p className="text-gray-700 text-base">{place.num_reviews} review{place.num_reviews > 1 && 's'}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 text-base">Price</p>
          <p className="text-gray-900 font-semibold">{place.price_level}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 text-base">Ranking</p>
          <p className="text-gray-900 font-semibold">{place.ranking}</p>
        </div>

        {place?.awards?.map((award, index) => (
          <div key={index} className="flex justify-between items-center my-2">
            <img src={award.images.small} alt={award.display_name} className="h-6 w-auto" />
            <p className="text-gray-600 text-sm">{award.display_name}</p>
          </div>
        ))}

        <div className="my-2">
          {place?.cuisine?.map(({ name }, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{name}</span>
          ))}
        </div>

        {place.address && (
          <p className="text-gray-700 text-base flex items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-gray-500"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.012a.775.775 0 01.022.012l.07.041 1.428.844a.75.75 0 01-.798 1.31l-1.445-.857-1.445.857a.75.75 0 01-.798-1.31l1.428-.844.022-.012.028-.012.07-.041.07-.04a16.97 16.97 0 014.873-1.266c.162.024.324.048.485.072.197.028.395.056.592.08.082.008.164.016.246.024.08.008.16.017.24.025.104.01.207.02.311.03a.75.75 0 01.789.77l-.006 1.745a.75.75 0 01-.757.746c-.085 0-.17-.002-.255-.006a24.747 24.747 0 01-1.84-1.556c-.592-.48-1.227-.96-1.9-.96-.673 0-1.308.48-1.9.96a24.747 24.747 0 01-1.84 1.556c-.085.004-.17.006-.255.006a.75.75 0 01-.757-.746l-.006-1.745a.75.75 0 01.789-.77c.104-.01.207-.02.311-.03.08-.008.16-.017.24-.025.082-.008.164-.016.246-.024.197-.028.395-.056.592-.08.162-.024.324-.048.485-.072a16.97 16.97 0 014.873 1.266zM12 3.75a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" clipRule="evenodd" /></svg>{place.address}
          </p>
        )}

        {place.phone && (
          <p className="text-gray-700 text-base flex items-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-gray-500"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.516 0 .992.224 1.348.648l1.088 1.088A18.775 18.775 0 0110.595 7.606l1.088 1.088c.424.356.648.832.648 1.348v1.372a3 3 0 01-3 3H3.75a3 3 0 01-3-3V4.5zM6.75 12a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zM15.75 15a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg> {place.phone}
          </p>
        )}
      </div>
      <div className="px-6 py-4 flex space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.open(place.web_url, '_blank')}
        >
          Trip Advisor
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.open(place.website, '_blank')}
        >
          Website
        </button>
      </div>
    </div>
  );
};

export default PlaceDetails;