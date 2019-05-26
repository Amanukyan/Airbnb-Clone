import * as React from 'react';
import { Field } from 'formik';
import { FieldProps } from 'formik';
import styled from 'styled-components';

import { SelectField } from '../../../shared/SelectField';

const CategorySelectField: React.FunctionComponent<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    optionList: string[];
  }
> = (props) => <SelectField {...props} optionList={['Appartement', 'House']} />;

export const Title = styled.div`
  font-size: 32px;
  margin: 50px 0;
`;

export const Page01 = () => (
  <>
    <Title>What kind of place are you listing?</Title>
    <Field
      name="category"
      placeholder="Category"
      component={CategorySelectField}
    />
  </>
);




