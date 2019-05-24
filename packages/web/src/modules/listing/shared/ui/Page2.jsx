import * as React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';

import { InputField } from '../../../shared/InputField';
import { Title } from './Page01';

export const Label = styled.div`
  font-size: 16px;
  margin: 10px 0;
`;

export const Page2 = () => (
  <>
    {/* <Title>Price ?</Title>
    <Field
      name="price"
      placeholder="Price"
      component={InputField}
      useNumberComponent={true}
    /> */}
    <Title>How many guests can your place accommodate?</Title>
    <Label>Guests</Label>
    <Field
      name="guests"
      placeholder="Guests"
      component={InputField}
      useNumberComponent={true}
    />
    <Label>How many beds can guests use?</Label>
    <Field
      name="beds"
      placeholder="Beds"
      component={InputField}
      useNumberComponent={true}
    />
  </>
);
