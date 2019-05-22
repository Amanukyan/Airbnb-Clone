import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const Option = Select.Option;

const StyledPlacesAutocomplete = styled(PlacesAutocomplete)`
  background: white;
  color: black;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;
// const AutocompleteContainer = styled.div`
//   background: white;
//   color: black;
// `;

// const SearchInputContainer = styled.div`
//   background: white;
//   color: black;

//   .search-input {
//     border: none;
//   }
// `;

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  handleChange = (address) => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = (selected) => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then((res) => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch((error) => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  isObject = (val) => {
    return typeof val === 'object' && val !== null;
  };

  classnames = (...args) => {
    const classes = [];
    args.forEach((arg) => {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else if (this.isObject(arg)) {
        Object.keys(arg).forEach((key) => {
          if (arg[key]) {
            classes.push(key);
          }
        });
      } else {
        throw new Error(
          '`classnames` only accepts string or object as arguments',
        );
      }
    });

    return classes.join(' ');
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    console.log('VALUE=', value);
  };

  render() {
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
    } = this.state;

    const searchOptions = {
      types: ['(regions)'],
    };

    return (
      <>
        <StyledPlacesAutocomplete
          searchOptions={searchOptions}
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            console.log('getInputProps', getInputProps());
            console.log('getInputProps', getInputProps().value);
            console.log('getInputProps', getInputProps().onChange);
            console.log('suggestions', suggestions);

            const formattedSuggestions = suggestions.map((suggestion) => {
              return suggestion.formattedSuggestion.mainText;
            });
            console.log('suggestions', formattedSuggestions);

            const options = suggestions.map((suggestion) => (
              <Option key={suggestion.id}>
                {suggestion.formattedSuggestion.mainText}
              </Option>
            ));

            return (
              <>
                <StyledSelect
                  showSearch
                  value={getInputProps().value}
                  placeholder={'Search...'}
                  // style={this.props.style}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={(value) =>
                    getInputProps().onChange({ target: { value } })
                  }
                  // onChange={this.handleInputChange}
                  notFoundContent={null}
                >
                  {options}
                </StyledSelect>

                {/* <SearchInputContainer>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'search-input',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </SearchInputContainer>
                {suggestions.length > 0 && (
                  <AutocompleteContainer>
                    {suggestions.map((suggestion) => {
                      const className = this.classnames(
                        'Demo__suggestion-item',
                        {
                          'Demo__suggestion-item--active': suggestion.active,
                        },
                      );

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                    })}
                  </AutocompleteContainer>
                )} */}
              </>
            );
          }}
        </StyledPlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Demo__geocode-result-header">Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
              </div>
            ) : (
              <div>
                <div className="Demo__geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="Demo__geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default SearchInput;
