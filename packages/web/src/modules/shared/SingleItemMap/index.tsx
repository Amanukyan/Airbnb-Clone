/*global google*/
import * as React from 'react';
import styled from 'styled-components';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

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

const MapWithAMarker = withGoogleMap<{
  defaultCenter: Location;
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
    <Marker
      position={{
        lat: props.defaultCenter.latitude,
        lng: props.defaultCenter.longitude,
      }}
    />
  </GoogleMap>
));

interface Props {
  location: Location;
}

export class SingleItemMap extends React.PureComponent<Props> {
  render() {
    const { location } = this.props;

    return (
      <>
        <MapWithAMarker
          containerElement={<ConainerElement />}
          mapElement={<MapElement />}
          defaultCenter={location}
          onClick={() => 'ok'}
        />
      </>
    );
  }
}
