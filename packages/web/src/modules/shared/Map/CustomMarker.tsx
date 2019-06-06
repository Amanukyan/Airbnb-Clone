import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import styled from 'styled-components';

interface CustomInfoWindowProps {
  position: {
    lat: number;
    lng: number;
  };
}

const CustomInfoWindow = styled(InfoWindow)<CustomInfoWindowProps>`
  max-height: 36px;

  .gm-ui-hover-effect {
    display: none !important;
  }
`;

interface Props {
  showInfoWindow: Boolean;
  info: String;
  lat: number;
  lng: number;
}

class CustomMarker extends Component<Props> {
  state = {
    showInfoWindow: false,
  };

  componentWillReceiveProps(nextProp: Props) {
    this.setState({
      showInfoWindow: nextProp.showInfoWindow,
    });
  }

  handleMouseOver = () => {
    this.setState({
      showInfoWindow: true,
    });
  };
  handleMouseExit = () => {
    this.setState({
      showInfoWindow: false,
    });
  };
  render() {
    const { showInfoWindow } = this.state;
    const { info, lat, lng } = this.props;
    return (
      <CustomInfoWindow
        position={{ lat, lng }}
        // onMouseOver={this.handleMouseOver}
        // onMouseOut={this.handleMouseExit}
      >
        <h4>{info}</h4>
        {/* {showInfoWindow && (
          <InfoWindow>
            <h4>{info}</h4>
          </InfoWindow>
        )} */}
      </CustomInfoWindow>
    );
  }
}
export default CustomMarker;
