import * as React from 'react';
import { FieldProps } from 'formik';
import { Form } from 'antd';

import SearchInput from './SearchBar/SearchInput';

const FormItem = Form.Item;

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
    const { form } = this.props;
    const { errors } = form;
    const errorMsg = errors['latitude'];

    return (
      <>
        <FormItem
          help={errorMsg}
          validateStatus={errorMsg ? 'error' : undefined}
        >
          <SearchInput onSearch={this.onSuggestSelect} />
        </FormItem>
      </>
    );
  }
}
