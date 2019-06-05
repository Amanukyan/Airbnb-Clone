import * as React from 'react';
import styled from 'styled-components';

import NavBar from '../../shared/Navbar';
import { withCurrentUser, WithCurrentUser } from '../../shared/withCurrentUser';

const Wrapper = styled.div`
  margin-top: 60px;
  /* background: #f5f9fc; */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

class C extends React.PureComponent<WithCurrentUser> {
  render() {
    const { me } = this.props;

    if (!me) {
      return null;
    }

    return (
      <>
        <NavBar me={me} loading={false} />
        <Wrapper>
          {me.firstName}
          <br />
          {me.lastName}
          <br />
          {me.email}
        </Wrapper>
      </>
    );
  }
}
export const EditUserConnector = withCurrentUser(C);
