import * as React from 'react';
import { LogoutController } from '@airbnb-clone/controller';
import { RouteComponentProps } from 'react-router-dom';

import { CallLogout } from './CallLogout';

export class Logout extends React.PureComponent<RouteComponentProps<{}>> {
  onFinish = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <LogoutController>
        {({ logout }) => (
          <CallLogout logout={logout} onFinish={this.onFinish} />
        )}
      </LogoutController>
    );
  }
}
