import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  right: 20px;
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
  color: #2d4560;
  margin: 0 15px;
`;

interface Props {}

class NavBar extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <NavBarWrapper>
          <Link to={`/`}>
            <LogoWrapper>
              <img src={process.env.PUBLIC_URL + '/logo.png'} alt="" />
              Wellin
            </LogoWrapper>
          </Link>
          <RightNavBarWrapper>
            <Link to={`/create-listing`}>
              <NavBarItem>
                <span>Create Listing</span>
              </NavBarItem>
            </Link>
            <Link to={`/register`}>
              <NavBarItem>
                <span>Sign Up</span>
              </NavBarItem>
            </Link>
            <Link to={`/login`}>
              <NavBarItem>
                <span>Login</span>
              </NavBarItem>
            </Link>
          </RightNavBarWrapper>
        </NavBarWrapper>
      </div>
    );
  }
}

export default NavBar;
