import * as React from "react";
import styled from "styled-components";

const NavBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  list-style: none;
  border-bottom: 1px solid lightgray;
  z-index: 9999;
`;

const NavBarItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  font-weight: bold;
  color: #069;
`;

interface Props {}

class NavBar extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <NavBarWrapper>
          <NavBarItem>
            <span>Login</span>
          </NavBarItem>
        </NavBarWrapper>
      </div>
    );
  }
}

export default NavBar;
