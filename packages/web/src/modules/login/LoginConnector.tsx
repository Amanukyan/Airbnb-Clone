import * as React from "react";
import { LoginController } from "@airbnb-clone/controller";
import { RouteComponentProps } from "react-router-dom";

import { LoginView } from "./ui/LoginView";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
