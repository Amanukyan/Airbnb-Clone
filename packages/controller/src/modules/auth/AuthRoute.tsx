import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { RouteProps, Route, RouteComponentProps, Redirect } from 'react-router';
import gql from 'graphql-tag';
import { MeQuery } from './__generated__/MeQuery';

type Props = RouteProps;

class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component } = this.props;

    if (!data || data.loading) {
      // loading screen
      return null;
    }

    if (!data.me) {
      // user not logged in
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { next: routeProps.location.pathname },
          }}
        />
      );
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      email
      firstName
      lastName
    }
  }
`;

export const AuthRoute = graphql<Props, MeQuery>(meQuery)(C);
