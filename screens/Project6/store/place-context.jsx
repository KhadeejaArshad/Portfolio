import { createContext, useState } from 'react';

export const PlaceContext = createContext({
  title: '',
  image: null,
  location: null,
  Title: () => {},
  Image: () => {},
  Location: () => {},
});

function PlaceContextProvider({ children }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  function Title(title) {
    setTitle(title);
  }

  function Image(image) {
    setImage(image);
  }

  function Location(location) {
    const newLocation = {
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    };

    setLocation(newLocation);
  }

  const value = {
    title,
    image,
    location,
    Title,
    Image,
    Location,
  };

  return <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>;
}

export default PlaceContextProvider;
