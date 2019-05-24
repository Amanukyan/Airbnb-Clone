import * as React from 'react';
import { FieldProps } from 'formik';

import SearchInput from './SearchBar/SearchInput';

interface DefaultCenter {
  lat: number;
  lng: number;
}

interface State {
  defaultCenter: DefaultCenter | null;
}

export class LocationField extends React.PureComponent<
  FieldProps<any> & {},
  State
> {
  state: State = {
    defaultCenter: null,
  };

  onSuggestSelect = (location: any) => {
    const { latitude, longitude } = location;
    const {
      form: { setValues, values },
    } = this.props;
    setValues({
      ...values,
      latitude,
      longitude,
    });
  };

  render() {
    const {
      form: { values, setValues }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    } = this.props;

    return (
      <>
        <SearchInput onSearch={this.onSuggestSelect} />
      </>
    );
  }
}
