import * as React from 'react';
import { Field } from 'formik';

import { InputField } from '../../../shared/InputField';
import { Title } from './Page01';

export const Page03 = () => (
  <>
    <Title>What's the price ?</Title>
    <Field
      name="price"
      placeholder="Price"
      component={InputField}
      useNumberComponent={true}
    />
  </>
);
