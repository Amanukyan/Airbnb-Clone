import * as React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { withFindListings, WithFindListings } from '@airbnb-clone/controller';
import { Link } from 'react-router-dom';

import NavBar from '../../shared/Navbar';
import { Map } from '../../shared/Map';
import SearchBar from '../../shared/SearchBar';
// import { ListingForm } from "../shared/ListingForm";

const { Meta } = Card;

const Wrapper = styled.div`
  display: flex;
  margin-top: 120px;
  background: #f5f9fc;
`;

const GridListingContainer = styled.div<{ showMap: boolean }>`
  display: flex;
  width: ${(props) => (props.showMap ? '65%' : '100%')};
  justify-content: center;
  flex-wrap: wrap;
`;

const MapContainer = styled.div`
  position: fixed;
  right: 0;
  width: 35%;
  height: calc(100% - 120px);
`;

const StyledCard = styled(Card)`
  padding: 20px !important;

  box-shadow: rgb(215, 215, 215) 0px 0px 1px !important;
  border: none !important;
  /* border-radius: 4px !important; */
  overflow: hidden !important;
  transition: box-shadow 0.2s ease 0s !important;

  .ant-card-cover {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
}
  }

  :hover {
    img {
      box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.67) !important;
    }
  }

  width: 50% !important;

  @media (max-width: 1000px) {
    width: 100% !important;
  }
`;

class C extends React.PureComponent<WithFindListings> {
  state = {
    hoverListingId: '',
    showMap: true,
  };

  getMarkerData = (listings: any[]) => {
    let markerData: any = [];
    markerData = listings.map((listing) => {
      const data = {
        id: listing.id,
        info: `$${listing.price}`,
        location: { latitude: listing.latitude, longitude: listing.longitude },
      };
      return data;
    });
    return markerData;
  };

  handleToggleShowMap = (checked: boolean) => {
    this.setState({ showMap: checked });
  };

  handleMouseOver = (listing: any) => {
    this.setState({
      hoverListingId: listing.id,
    });
  };
  handleMouseExit = () => {
    this.setState({
      hoverListingId: null,
    });
  };

  render() {
    const { listings, loading } = this.props;
    const { hoverListingId, showMap } = this.state;

    const markerData: any = this.getMarkerData(listings);
    return (
      <>
        <NavBar />
        <SearchBar onShowMapSwitchChange={this.handleToggleShowMap} />
        <Wrapper>
          <GridListingContainer showMap={showMap}>
            {loading && <div>...loading</div>}
            {listings.map((l) => (
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
          {showMap && (
            <MapContainer>
              <Map
                hoverListingId={hoverListingId}
                markerData={markerData as any}
              />
            </MapContainer>
          )}
        </Wrapper>
      </>
    );
  }
}

export const FindListingsConnector = withFindListings(C);
