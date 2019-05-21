import * as React from 'react';
import styled from 'styled-components';
import { ViewListing } from '@airbnb-clone/controller';
import { RouteComponentProps, Link } from 'react-router-dom';

import NavBar from '../../shared/Navbar';
import { SingleItemMap } from '../../shared/SingleItemMap';

const Wrapper = styled.div`
  margin-top: 60px;
  background: #f5f9fc;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ListingHeader = styled.div`
  margin: 20px 0;

  font-size: 20px;
  font-weight: bold;
`;

const ImageWrapper = styled.div`
  img {
    width: 370px;
    height: 250px;
  }
`;

const ListingDetails = styled.div`
  margin: 20px 0;
  width: 100%;
`;

const MapWrapper = styled.div`
  height: 250px;
`;

export class ViewListingConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }>
> {
  render() {
    const {
      match: {
        params: { listingId },
      },
    } = this.props;
    return (
      <>
        <NavBar />
        <ViewListing listingId={listingId}>
          {(data) => {
            console.log(data);
            if (!data.listing) {
              return <div>...loading</div>;
            }

            return (
              <Wrapper>
                <ListingWrapper>
                  <ListingHeader>
                    <div>{data.listing.name}</div>
                  </ListingHeader>
                  <ImageWrapper>
                    <img src={data.listing.pictureUrl} />
                  </ImageWrapper>
                  <ListingDetails>
                    <div>DESCRIPTION</div>
                    <div>{data.listing.description}</div>
                    <div>LOCATION</div>
                    <MapWrapper>
                      <SingleItemMap
                        location={{
                          latitude: data.listing.latitude,
                          longitude: data.listing.longitude,
                        }}
                      />
                    </MapWrapper>
                  </ListingDetails>
                  <div>
                    <Link to={`/listing/${listingId}/chat`}>chat</Link>
                  </div>
                  <div>
                    <Link to={`/listing/${listingId}/edit`}>edit</Link>
                  </div>
                </ListingWrapper>
              </Wrapper>
            );
          }}
        </ViewListing>
      </>
    );
  }
}
