import * as React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { SearchListings } from '@airbnb-clone/controller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUser } from '@fortawesome/free-solid-svg-icons';

import NavBar from '../../shared/Navbar';
import { Map, Location } from '../../shared/Map';
import SearchBar from '../../shared/SearchBar';
import { withCurrentUser, WithCurrentUser } from '../../shared/withCurrentUser';

const { Meta } = Card;

const Wrapper = styled.div`
  display: flex;
  margin-top: 110px;
  /* background: #f5f9fc; */
  background: white;
`;

const GridListingContainer = styled.div<{ showMap: boolean }>`
  padding: 10px;
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

const CardWrapper = styled.div`
  padding: 10px !important;

  /* box-shadow: rgb(215, 215, 215) 0px 0px 1px !important; */
  /* border-radius: 4px !important; */
  overflow: hidden !important;
  transition: box-shadow 0.2s ease 0s !important;

  width: calc(100% / 3) !important;

  @media (max-width: 1300px) {
    width: 50% !important;
  }

  @media (max-width: 600px) {
    width: 100% !important;
  }
`;

const StyledCard = styled(Card)`
  width: unset;
  border: none !important;

  box-shadow: rgb(215, 215, 215) 0px 2px 4px;
  border-radius: 8px;

  .ant-card-cover {
    position: relative;
    width: 100%;
    /* padding-top: 56.25%; */
    padding-top: 70%;
  }

  .ant-card-body {
    padding: 20px;
    zoom: 1;
  }

  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
  }

  :hover {
    img {
      box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.67) !important;
    }
  }
`;

const Title = styled.div`
  font-size: 20px;
  color: #242424;
`;

const SubTitle = styled.div`
  font-size: 14px;
  color: rgb(128, 128, 128);
  text-transform: capitalize;
`;

const Price = styled.div`
  margin-top: 8px;
  font-size: 23px;
  font-weight: 300;

  color: #fbc31d;
`;

const BottomSection = styled.div`
  display: flex;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #d6d6d6;
`;

const IconInfoWrapper = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;
const IconAndData = styled.div`
  span  {
    padding-left: 5px;
    font-weight: bold;
  }
`;

const IconUnderText = styled.div`
  color: rgb(150, 150, 150);
  margin-top: 10px;
`;

interface State {
  hoverListingId?: string;
  showMap: boolean;
  searchedLocation?: Location;
  minPrice: number;
  maxPrice: number;
}

class C extends React.PureComponent<WithCurrentUser, State> {
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

    console.log('this.props.me=', this.props.me);
    // const markerData: any = this.getMarkerData(listings);
    return (
      <>
        <NavBar me={this.props.me} loading={false} />
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
                    <CardWrapper>
                      <Link to={`/listing/${l.id}`}>
                        <StyledCard
                          key={`${l.id}-card`}
                          hoverable={true}
                          onMouseOver={() => this.handleMouseOver(l)}
                          onMouseOut={this.handleMouseExit}
                          style={{}}
                          cover={
                            l.pictureUrl && (
                              <img alt="example" src={l.pictureUrl} />
                            )
                          }
                        >
                          <Title>{l.name}</Title>
                          <Price>${l.price}</Price>
                          <SubTitle>{l.category}</SubTitle>
                          <BottomSection>
                            <IconInfoWrapper>
                              <IconAndData>
                                <FontAwesomeIcon
                                  color={'rgb(150,150,150)'}
                                  icon={faBed}
                                />{' '}
                                <span>{l.beds}</span>
                              </IconAndData>
                              <IconUnderText>Beds</IconUnderText>
                            </IconInfoWrapper>
                            <IconInfoWrapper>
                              <IconAndData>
                                <FontAwesomeIcon
                                  color={'rgb(150,150,150)'}
                                  icon={faUser}
                                />{' '}
                                <span>{l.guests}</span>
                              </IconAndData>
                              <IconUnderText>Guests</IconUnderText>
                            </IconInfoWrapper>
                          </BottomSection>
                        </StyledCard>
                      </Link>
                    </CardWrapper>
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

export const FindListingsConnector = withCurrentUser(C);
