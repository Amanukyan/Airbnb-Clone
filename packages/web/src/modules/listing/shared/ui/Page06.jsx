import * as React from 'react';
import { Field } from 'formik';

import { InputField } from '../../../shared/InputField';
import { Title } from './Page01';

export const Page06 = () => (
  <>
    <Title>Describe your accomodation</Title>
    <Field name="name" placeholder="Name" component={InputField} />
    <Field
      name="description"
      placeholder="Description"
      component={InputField}
    />
  </>
);
