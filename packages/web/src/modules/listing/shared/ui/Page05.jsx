import * as React from 'react';
import { Field } from 'formik';

import { Title } from './Page01';
import { UploadPictureField } from '../../../shared/UploadPictureField';

export const Page05 = () => (
  <>
    <Title>Add Picture</Title>
    <Field name="picture" component={UploadPictureField} />
  </>
);
