import * as React from "react";
import styled from "styled-components";

const NavBarWrapper = styled.ul`
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
  display: inline-block;
  padding: 8px 15px;
  text-decoration: none;
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
            <a href="#">Home</a>
          </NavBarItem>
          <NavBarItem>
            <a href="#">About</a>
          </NavBarItem>
          <NavBarItem>
            <a href="#">FAQ</a>
          </NavBarItem>
          <NavBarItem>
            <a href="#">Contact</a>
          </NavBarItem>
        </NavBarWrapper>
      </div>
    );
  }
}

export default NavBar;
