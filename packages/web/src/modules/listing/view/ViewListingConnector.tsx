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
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ListingHeader = styled.div`
  margin: 20px 0;

  font-size: 32px;
  font-weight: bold;
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
  }
`;

const ListingDetails = styled.div`
  margin: 20px 0;
  width: 100%;
`;

const DetailsTitle = styled.div`
  font-size: 32px;
  font-weight: 500;
  margin: 10px 0;
`;

const MapWrapper = styled.div`
  height: 450px;
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
        <NavBar me={null} loading={false} />
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
                    <img src={data.listing.pictureUrl} alt="" />
                  </ImageWrapper>
                  <ListingDetails>
                    <DetailsTitle>Description</DetailsTitle>
                    <div>{data.listing.description}</div>
                    <DetailsTitle>Location</DetailsTitle>
                    <MapWrapper>
                      <SingleItemMap
                        location={{
                          latitude: data.listing.latitude,
                          longitude: data.listing.longitude,
                        }}
                      />
                    </MapWrapper>
                  </ListingDetails>
                  {/* <div>
                    <Link to={`/listing/${listingId}/chat`}>chat</Link>
                  </div>
                  <div>
                    <Link to={`/listing/${listingId}/edit`}>edit</Link>
                  </div> */}
                  <Link to={`/users/view/${data.listing.owner.id}`}>
                    {data.listing.owner.email}
                  </Link>
                </ListingWrapper>
              </Wrapper>
            );
          }}
        </ViewListing>
      </>
    );
  }
}
