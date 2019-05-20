import * as React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { withFindListings, WithFindListings } from "@airbnb-clone/controller";
import { Link } from "react-router-dom";

import NavBar from "../../shared/Navbar";
import { Map } from "../../shared/Map";
// import { ListingForm } from "../shared/ListingForm";

const { Meta } = Card;

const Wrapper = styled.div`
  display: flex;
  margin-top: 60px;
  background: #f5f9fc;
`;

const GridListingContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: center;
  flex-wrap: wrap;
`;

const MapContainer = styled.div`
  position: fixed;
  right: 0;
  width: 40%;
  height: calc(100% - 60px);
`;

const StyledCard = styled(Card)`
  width: 370px !important;
  margin: 20px !important;

  box-shadow: rgb(215, 215, 215) 0px 2px 4px !important;
  border-radius: 4px !important;
  overflow: hidden !important;
  transition: box-shadow 0.2s ease 0s !important;

  img {
    height: 250px;
  }

  :hover {
    box-shadow: rgb(215, 215, 215) 0px 8px 16px !important;
  }
`;

class C extends React.PureComponent<WithFindListings> {
  state = {
    hoverListingId: ""
  };

  getMarkerData = (listings: any[]) => {
    let markerData: any = [];
    markerData = listings.map(listing => {
      const data = {
        id: listing.id,
        info: `$${listing.price}`,
        location: { latitude: listing.latitude, longitude: listing.longitude }
      };
      return data;
    });
    return markerData;
  };

  handleMouseOver = (listing: any) => {
    this.setState({
      hoverListingId: listing.id
    });
  };
  handleMouseExit = () => {
    this.setState({
      hoverListingId: null
    });
  };

  render() {
    const { listings, loading } = this.props;
    const { hoverListingId } = this.state;

    const markerData: any = this.getMarkerData(listings);
    console.log(markerData);
    return (
      <>
        <NavBar />
        <Wrapper>
          <GridListingContainer>
            {loading && <div>...loading</div>}
            {listings.map(l => (
              <StyledCard
                key={`${l.id}-card`}
                hoverable={true}
                onMouseOver={() => this.handleMouseOver(l)}
                onMouseOut={this.handleMouseExit}
                style={{ width: 240 }}
                cover={l.pictureUrl && <img alt="example" src={l.pictureUrl} />}
              >
                <Link to={`/listing/${l.id}`}>
                  <Meta title={l.name} description={l.owner.email} />
                </Link>
              </StyledCard>
            ))}
          </GridListingContainer>
          <MapContainer>
            <Map
              hoverListingId={hoverListingId}
              markerData={markerData as any}
            />
          </MapContainer>
        </Wrapper>
      </>
    );
  }
}

export const FindListingsConnector = withFindListings(C);
