import * as React from 'react';
import styled from 'styled-components';
import { Switch, Slider, Popover, Button, Icon } from 'antd';

import SearchInput from './SearchInput';
import { SliderValue } from 'antd/lib/slider';

const StyledSlider = styled(Slider)`
  width: 300px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  position: fixed;
  top: 60px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #0000000f;
  z-index: 10;
`;

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 80%;
`;

const SearchInputContainer = styled.div`
  height: 100%;
  width: 40%;
  margin-left: 25px;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff91;
  z-index: 20;

  .ant-select-selection__rendered {
    line-height: 60px !important;
  }

  .ant-select-selection {
    border: none;
    /* border-right: 1px solid #d9d9d9; */
    border-radius: 0px;
    background-color: unset;
  }

  .ant-select-selection--single {
    height: unset;
  }
  *  {
    outline: none !important;
  }
  * {
    border: none !important;
    box-shadow: unset !important;
  }
`;

const StyledSearchInput = styled(SearchInput)``;

const PriceSliderContainer = styled.div`
  height: 100%;
  margin-left: 20px;
  z-index: 20;

  .ant-btn {
    height: 100%;
    border: 1px solid #f0f0f0;
    border-top: none;
    border-bottom: none;
    border-radius: unset;
    width: 100px;
  }
  &:focus {
    background-color: none;
    border-color: none;
  }

  &:hover {
    background-color: none;
    border-color: none;
  }
`;

const SwitchContainer = styled.div`
  width: 20%;
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;

  span {
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.65);
  }

  .ant-switch-checked {
    background-color: #bae7ff;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

interface Props {
  onShowMapSwitchChange: (checked: boolean) => any;
  onSearch: (location: Location) => any;
  onSearchPrice: (value: SliderValue) => any;
}

class SearchBar extends React.PureComponent<Props> {
  renderPriceSlider = () => {
    const marks = {
      0: '$0',
      1000: {
        style: {
          'padding-right': '30px',
        },
        label: <strong>$1000+</strong>,
      },
    };

    return (
      <StyledSlider
        range
        marks={marks}
        min={0}
        max={1000}
        defaultValue={[0, 1000]}
        onAfterChange={(value) => this.props.onSearchPrice(value)}
      />
    );
  };

  render() {
    const { onShowMapSwitchChange, onSearch } = this.props;

    return (
      <SearchBarWrapper>
        <InputsWrapper>
          <SearchInputContainer>
            <Icon style={{ fontSize: '20px', color: 'black' }} type="search" />
            <StyledSearchInput onSearch={onSearch} />
          </SearchInputContainer>
          <PriceSliderContainer>
            <Popover
              placement="bottomLeft"
              // title={text}
              content={this.renderPriceSlider()}
              trigger="click"
            >
              <Button>Price</Button>
            </Popover>
          </PriceSliderContainer>
        </InputsWrapper>
        <SwitchContainer>
          <span>Show Map</span>
          <Switch defaultChecked onChange={onShowMapSwitchChange} />
        </SwitchContainer>
      </SearchBarWrapper>
    );
  }
}

export default SearchBar;
