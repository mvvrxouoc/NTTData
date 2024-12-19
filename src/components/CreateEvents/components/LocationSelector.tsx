import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface LocationSelectorProps {
  onSelectLocation: (location: string) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.416775,
  lng: -3.703790,
};

const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelectLocation }) => {
  const [location, setLocation] = useState(center);
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(true);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setLocation({ lat, lng });
      fetchAddress(lat, lng);
    }
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`);
    const data = await response.json();
    if (data.results && data.results[0]) {
      setAddress(data.results[0].formatted_address);
    }
  };

  const handleSubmit = () => {
    if (address) {
      onSelectLocation(address);
      setShowMap(false);
    } else {
      alert('Por favor, selecciona una ubicación en el mapa.');
    }
  };

  return (
    <div>
      <h2>Selecciona Ubicación</h2>
      {showMap ? (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={14}
            onClick={handleMapClick}
          >
            <Marker position={location} />
          </GoogleMap>
        </LoadScript>
      ) : null}
      <p>Ubicación seleccionada: {address}</p>
      <button onClick={handleSubmit}>Añadir ubicación</button>
    </div>
  );
};