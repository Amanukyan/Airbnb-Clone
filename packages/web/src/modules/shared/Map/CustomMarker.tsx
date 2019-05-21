import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";

interface Props {
  showInfoWindow: Boolean;
  info: String;
  lat: number;
  lng: number;
}

class CustomMarker extends Component<Props> {
  state = {
    showInfoWindow: false
  };

  componentWillReceiveProps(nextProp: Props) {
    this.setState({
      showInfoWindow: nextProp.showInfoWindow
    });
  }

  handleMouseOver = () => {
    this.setState({
      showInfoWindow: true
    });
  };
  handleMouseExit = () => {
    this.setState({
      showInfoWindow: false
    });
  };
  render() {
    const { showInfoWindow } = this.state;
    const { info, lat, lng } = this.props;
    return (
      <Marker
        position={{ lat, lng }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseExit}
      >
        {showInfoWindow && (
          <InfoWindow>
            <h4>{info}</h4>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}
export default CustomMarker;
