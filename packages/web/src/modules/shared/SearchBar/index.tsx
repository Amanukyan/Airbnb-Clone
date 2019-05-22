import * as React from 'react';
import styled from 'styled-components';
import { Switch } from 'antd';

import SearchInput from './SearchInput';

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f83ef;
  position: fixed;
  top: 60px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #0000000f;
  z-index: 10;
`;

const SearchInputContainer = styled.div`
  height: 60%;
  width: 200px;
  margin-left: 20px;
  border-radius: 9999px;
  /* padding: 0 0 0 19px; */
  /* display: flex; */
  /* align-items: center; */
  background: #1974ec;
  color: #ffffff91;
  z-index: 20;
`;

const SwitchContainer = styled.div`
  margin-right: 20px;

  span {
    margin-right: 10px;
    color: white;
  }

  .ant-switch-checked {
    background-color: #bae7ff;
  }
`;

interface Props {
  onShowMapSwitchChange: (checked: boolean) => any;
}

class SearchBar extends React.PureComponent<Props> {
  render() {
    const { onShowMapSwitchChange } = this.props;

    return (
      <SearchBarWrapper>
        <SearchInputContainer>
          <SearchInput />
        </SearchInputContainer>
        <SwitchContainer>
          <span>Show Map</span>
          <Switch defaultChecked onChange={onShowMapSwitchChange} />
        </SwitchContainer>
      </SearchBarWrapper>
    );
  }
}

export default SearchBar;
