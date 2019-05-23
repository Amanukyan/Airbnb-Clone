/*global google*/
import * as React from 'react';
import styled from 'styled-components';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

import CustomMarker from './CustomMarker';

const ConainerElement = styled.div`
  height: 100%;
  width: 100%;
`;

const MapElement = styled.div`
  height: 100%;
  width: 100%;
`;

export interface Location {
  latitude: number;
  longitude: number;
}

interface MarkerData {
  id: String;
  location: Location;
  info: String;
}

// Syndey Opera House: lat: -33.8568, lng: 151.2153
const MapWithAMarker = withGoogleMap<{
  defaultCenter: Location;
  center: Location;
  markerData: MarkerData[];
  hoverListingId?: String;
  onClick: (e: google.maps.KmlMouseEvent | google.maps.MouseEvent) => void;
}>((props) => (
  <GoogleMap
    defaultZoom={14}
    center={{
      lat: props.center.latitude,
      lng: props.center.longitude,
    }}
    defaultCenter={{
      lat: props.defaultCenter.latitude,
      lng: props.defaultCenter.longitude,
    }}
    defaultOptions={{
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      rotateControl: false,
      fullscreenControl: false,
    }}
    onClick={props.onClick}
  >
    {props.markerData.map((data) => (
      <CustomMarker
        key={data.id as string}
        showInfoWindow={props.hoverListingId === data.id}
        info={data.info}
        lat={data.location.latitude}
        lng={data.location.longitude}
      />
    ))}
  </GoogleMap>
));

interface Props {
  hoverListingId?: String;
  markerData: MarkerData[];
  mapCenter: Location | null;
}

export class Map extends React.PureComponent<Props> {
  render() {
    const { markerData, hoverListingId, mapCenter } = this.props;
    console.log('defaultCenter', mapCenter);
    return (
      <>
        {(markerData.length > 0 || mapCenter) && (
          <MapWithAMarker
            containerElement={<ConainerElement />}
            mapElement={<MapElement />}
            defaultCenter={mapCenter || markerData[0].location}
            center={mapCenter || markerData[0].location}
            markerData={markerData}
            hoverListingId={hoverListingId}
            onClick={() => 'ok'}
          />
        )}
      </>
    );
  }
}
