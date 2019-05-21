import * as React from "react";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #1f83ef;
  position: fixed;
  top: 60px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #0000000f;
  z-index: 9999;
`;

const SearchInputContainer = styled.div`
  height: 60%;
  width: 200px;
  margin-left: 20px;
  border-radius: 9999px;
  padding: 0 0 0 19px;
  display: flex;
  align-items: center;
  background: #1974ec;
  color: #ffffff91;
`;

interface Props {}

class SearchBar extends React.PureComponent<Props> {
  render() {
    return (
      <SearchBarWrapper>
        <SearchInputContainer>Search</SearchInputContainer>
      </SearchBarWrapper>
    );
  }
}

export default SearchBar;
