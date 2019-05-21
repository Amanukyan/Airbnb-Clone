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

interface Location {
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
  markerData: MarkerData[];
  hoverListingId: String;
  onClick: (e: google.maps.KmlMouseEvent | google.maps.MouseEvent) => void;
}>((props) => (
  <GoogleMap
    defaultZoom={13}
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
  hoverListingId: String;
  markerData: MarkerData[];
}

export class Map extends React.PureComponent<Props> {
  render() {
    const { markerData, hoverListingId } = this.props;

    return (
      <>
        {markerData.length && (
          <MapWithAMarker
            containerElement={<ConainerElement />}
            mapElement={<MapElement />}
            defaultCenter={markerData[0].location}
            markerData={markerData}
            hoverListingId={hoverListingId}
            onClick={() => 'ok'}
          />
        )}
      </>
    );
  }
}
