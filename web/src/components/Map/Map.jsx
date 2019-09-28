import React, { useCallback, useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { useDispatch, useSelector } from 'react-redux';
import { compose, withProps } from 'recompose';

import { addData } from '../../store/data/actions';
import { dataSelector } from '../../store/selectors/data';
import { locationSelector } from '../../store/selectors/location';
import marker from './marker.png';

const DEFAULT_ZOOM = 11;
const DEFAULT_CENTER = {
  lat: 47.36667,
  lng: 8.55,
};

const mapStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];
const itemToWaypoint = ({ geo: { lat, lng } }) => ({ location: { lat, lng } });

const dataToWaypoints = (data) =>
  data.reduce((waypoints, item, index) => {
    if (data.length > 1 && index < data.length - 1) {
      waypoints.push(itemToWaypoint(item));
    }
    return waypoints;
  }, []);

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%`, width: '100%' }} />,
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%`, width: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ handleLoading }) => {
  const location = useSelector(locationSelector);
  const data = useSelector(dataSelector);
  const dispatch = useDispatch();
  const [directions, setDirections] = useState(null);

  const fetchData = useCallback(() => {
    dispatch(addData());
  }, [dispatch]);

  useEffect(fetchData, [location]);

  useEffect(() => {
    if (location && data && data.length) {
      const DirectionsService = new window.google.maps.DirectionsService();
      const waypoints = dataToWaypoints(data);
      DirectionsService.route(
        {
          origin: location,
          destination: data.length && itemToWaypoint(data[data.length - 1]),
          waypoints,
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions`, result);
          }
        }
      );
    }
  }, [location, data]);

  useEffect(() => {
    if (directions && data && location) {
      handleLoading(false);
    }
  }, [handleLoading, directions, data, location]);
  return (
    <React.Fragment>
      <GoogleMap
        defaultZoom={DEFAULT_ZOOM}
        defaultCenter={DEFAULT_CENTER}
        options={{ streetViewControl: false, mapTypeControl: false, styles: mapStyles }}
      >
        {data &&
          data.map((item) => (
            <Marker
              key={item.emoji}
              icon={{
                url: marker,
                labelOrigin: new window.google.maps.Point(24, 49),
              }}
              label={{ text: `${item.emoji} ${item.name}`, color: '#27DEBF', fontWeight: 'bold' }}
              position={item.geo}
            />
          ))}
        {location && (
          <Marker
            icon={{
              url: marker,
              labelOrigin: new window.google.maps.Point(24, 49),
            }}
            label={{ text: 'you', color: '#27DEBF', fontWeight: 'bold' }}
            position={location}
          />
        )}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              markerOptions: { visible: false },
              polylineOptions: {
                strokeColor: '#27DEBF',
              },
            }}
          />
        )}
      </GoogleMap>
    </React.Fragment>
  );
});

export default Map;
