import * as React from 'react';
import styled from 'styled-components';
import { Switch, Slider, Popover, Button } from 'antd';

import SearchInput from './SearchInput';
import { SliderValue } from 'antd/lib/slider';

const StyledSlider = styled(Slider)`
  width: 300px;
`;

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

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 80%;
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

const PriceSliderContainer = styled.div`
  height: 60%;
  margin-left: 20px;
  z-index: 20;
`;

const SwitchContainer = styled.div`
  width: 20%;
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;

  span {
    margin-right: 10px;
    color: white;
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
            <SearchInput onSearch={onSearch} />
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
