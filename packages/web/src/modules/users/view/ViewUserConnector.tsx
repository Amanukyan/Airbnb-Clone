import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { ViewUser } from '@airbnb-clone/controller';

import NavBar from '../../shared/Navbar';
import { withCurrentUser, WithCurrentUser } from '../../shared/withCurrentUser';

const Wrapper = styled.div`
  margin-top: 60px;
  /* background: #f5f9fc; */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

class C extends React.PureComponent<
  RouteComponentProps<{
    userId: string;
  }> &
    WithCurrentUser
> {
  render() {
    const {
      me,
      match: {
        params: { userId },
      },
    } = this.props;

    return (
      <>
        <NavBar me={me} loading={false} />
        <ViewUser userId={userId}>
          {(data) => {
            console.log(data);
            if (!data.user) {
              return <div>...loading</div>;
            }

            return (
              <Wrapper>
                {data.user.firstName}
                <br />
                {data.user.lastName}
                <br />
                {data.user.email}
              </Wrapper>
            );
          }}
        </ViewUser>
      </>
    );
  }
}
export const ViewUserConnector = withCurrentUser(C);
