import * as React from 'react';
import { Field } from 'formik';

import { LocationField } from '../../../shared/LocationField';
import { Title } from './Page01';

export const Page04 = () => (
  <>
    <Title>Where's your accomodation located ?</Title>
    <Field name="tmp" component={LocationField} />
  </>
);
