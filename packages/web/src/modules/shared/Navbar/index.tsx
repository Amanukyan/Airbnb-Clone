import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { WithCurrentUser } from '../withCurrentUser';
import { Avatar, Modal, Dropdown, Menu } from 'antd';
import { RegisterConnector } from '../../register/RegisterConnector';
import { RegisterController, LoginController } from '@airbnb-clone/controller';
import { RegisterView } from '../../register/ui/RegisterView';
import { LoginView } from '../../login/ui/LoginView';

const NavBarWrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #0000000f;
  z-index: 10;
`;

const RightNavBarWrapper = styled.div`
  position: absolute;
  right: 0px;
  margin-right: 20px;
  color: #069;
  height: 100%;

  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  position: absolute;
  margin-left: 20px;
  font-size: 28px;
  font-weight: 200;
  letter-spacing: 5px;
  color: #2d4560;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 60%;
    margin-right: 10px;
  }
`;

const NavBarItem = styled.div`
  margin: 0px 10px;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;

  span {
    color: black;
  }
`;

const Profile = styled.div`
  margin-left: 10px;
  .ant-avatar {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
`;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to={`/profile`}>Profile</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={`/logout`}>Logout</Link>
    </Menu.Item>
  </Menu>
);

// interface Props {
//   user?: {
//     name: string;
//   };
// }

class NavBar extends React.Component<WithCurrentUser> {
  state = { loginModelIsVisible: false, registerModelIsVisible: false };

  showRegisterModal = () => {
    this.setState({
      registerModelIsVisible: true,
    });
  };

  showLoginModal = () => {
    this.setState({
      loginModelIsVisible: true,
    });
  };

  handleOk = (e: React.MouseEvent<any, MouseEvent>) => {
    console.log(e);
    this.setState({
      loginModelIsVisible: false,
      registerModelIsVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      loginModelIsVisible: false,
      registerModelIsVisible: false,
    });
  };
  render() {
    const { me } = this.props;
    const { registerModelIsVisible, loginModelIsVisible } = this.state;
    const isLoggedIn = true;
    return (
      <>
        <NavBarWrapper>
          <Link to={`/`}>
            <LogoWrapper>
              <img src={process.env.PUBLIC_URL + '/logo.png'} alt="" />
              Wellin
            </LogoWrapper>
          </Link>
          <RightNavBarWrapper>
            <NavBarItem>
              <Link to={`/create-listing`}>
                <span>Create Listing</span>
              </Link>
            </NavBarItem>
            {!!me ? (
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                trigger={['click']}
              >
                <Profile>
                  <Avatar icon="user" />
                </Profile>
              </Dropdown>
            ) : (
              // <ProfilePic>{me.email}</ProfilePic>
              <>
                <NavBarItem onClick={this.showRegisterModal}>
                  <span>Sign Up</span>
                </NavBarItem>
                <NavBarItem onClick={this.showLoginModal}>
                  <span>Login</span>
                </NavBarItem>
              </>
            )}
          </RightNavBarWrapper>
        </NavBarWrapper>
        <Modal
          title="Register"
          visible={registerModelIsVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
          footer={null}
        >
          <RegisterController>
            {({ submit }) => (
              <RegisterView onFinish={this.handleCancel} submit={submit} />
            )}
          </RegisterController>
        </Modal>
        <Modal
          title="Login"
          visible={loginModelIsVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
          footer={null}
        >
          <LoginController>
            {({ submit }) => (
              <LoginView onFinish={this.handleCancel} submit={submit} />
            )}
          </LoginController>
        </Modal>
      </>
    );
  }
}

export default NavBar;
