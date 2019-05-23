import * as React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { withFindListings, WithFindListings } from '@airbnb-clone/controller';
import { Link } from 'react-router-dom';
import { SearchListings } from '@airbnb-clone/controller';

import NavBar from '../../shared/Navbar';
import { Map, Location } from '../../shared/Map';
import SearchBar from '../../shared/SearchBar';
// import { ListingForm } from "../shared/ListingForm";

const { Meta } = Card;

const Wrapper = styled.div`
  display: flex;
  margin-top: 120px;
  /* background: #f5f9fc; */
  background: white;
`;

const GridListingContainer = styled.div<{ showMap: boolean }>`
  display: flex;
  width: ${(props) => (props.showMap ? '65%' : '100%')};
  justify-content: flex-start;
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

interface State {
  hoverListingId?: string;
  showMap: boolean;
  searchedLocation?: Location;
  minPrice: number;
  maxPrice: number;
}

class C extends React.PureComponent<WithFindListings, State> {
  state = {
    hoverListingId: undefined,
    showMap: true,
    searchedLocation: {
      longitude: 151.2034,
      latitude: -33.8634,
    },
    minPrice: 0,
    maxPrice: 1000,
  };

  updateDimensions = () => {
    this.setState({ showMap: window.innerWidth > 800 });
  };
  componentWillMount = () => {
    this.updateDimensions();
  };
  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
  };
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions);
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

  handleSearch = (location: any) => {
    this.setState({ searchedLocation: location });
    console.log('searchedLocation', location);
  };

  handlePriceSearch = (value: any) => {
    const minPrice = value[0];
    const maxPrice = value[1];
    this.setState({
      minPrice,
      maxPrice,
    });
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
      hoverListingId: undefined,
    });
  };

  render() {
    // const { listings, loading } = this.props;
    const {
      hoverListingId,
      showMap,
      searchedLocation,
      minPrice,
      maxPrice,
    } = this.state;

    // const markerData: any = this.getMarkerData(listings);
    return (
      <>
        <NavBar />
        <SearchBar
          onShowMapSwitchChange={this.handleToggleShowMap}
          onSearch={this.handleSearch}
          onSearchPrice={this.handlePriceSearch}
        />
        <SearchListings
          variables={{
            input: {
              longitude: searchedLocation.longitude,
              latitude: searchedLocation.latitude,
              minPrice,
              maxPrice,
            },
            limit: 30,
            offset: 0,
          }}
        >
          {({ listings, hasMoreListings, loadMore }) => {
            const markerData: any = this.getMarkerData(listings);

            return (
              <Wrapper>
                <GridListingContainer showMap={showMap}>
                  {/* {loading && <div>...loading</div>} */}
                  {listings.map((l) => (
                    <StyledCard
                      key={`${l.id}-card`}
                      hoverable={true}
                      onMouseOver={() => this.handleMouseOver(l)}
                      onMouseOut={this.handleMouseExit}
                      style={{ width: 240 }}
                      cover={
                        l.pictureUrl && <img alt="example" src={l.pictureUrl} />
                      }
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
                      mapCenter={searchedLocation}
                    />
                  </MapContainer>
                )}
              </Wrapper>
            );
          }}
        </SearchListings>
      </>
    );
  }
}

export const FindListingsConnector = withFindListings(C);
