import * as React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { withFindListings, WithFindListings } from "@airbnb-clone/controller";
import { Link } from "react-router-dom";

import NavBar from "../../shared/Navbar";

const { Meta } = Card;

const GridListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #fafafa;
  width: 100%;
  margin-top: 60px;
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
  render() {
    const { listings, loading } = this.props;
    return (
      <>
        <NavBar />
        <GridListingContainer>
          {loading && <div>...loading</div>}
          {listings.map(l => (
            <StyledCard
              key={`${l.id}-card`}
              hoverable={true}
              style={{ width: 240 }}
              cover={l.pictureUrl && <img alt="example" src={l.pictureUrl} />}
            >
              <Link to={`/listing/${l.id}`}>
                <Meta title={l.name} description={l.owner.email} />
              </Link>
            </StyledCard>
          ))}
        </GridListingContainer>
      </>
    );
  }
}

export const FindListingsConnector = withFindListings(C);
