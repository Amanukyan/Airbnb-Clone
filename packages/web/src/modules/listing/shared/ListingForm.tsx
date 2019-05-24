import * as React from 'react';
import { Form as AntForm, Button } from 'antd';
import { Form, Formik, FormikActions } from 'formik';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Page01 } from './ui/Page01';
import { Page2 } from './ui/Page2';
import { Page03 } from './ui/Page03';
import { Page04 } from './ui/Page04';
import { Page05 } from './ui/Page05';
import { Page06 } from './ui/Page06';

const FormItem = AntForm.Item;

const Header = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: #f1f1f1 solid;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #909090;
`;

export interface ListingFormValues {
  pictureUrl: string | null;
  picture: File | null;
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}

interface State {
  page: number;
}

interface Props {
  initialValues?: ListingFormValues;
  submit: (
    data: ListingFormValues,
    actions: FormikActions<ListingFormValues>,
  ) => Promise<void>;
}

// tslint:disable-next-line:jsx-key
const pages = [
  <Page01 />,
  <Page2 />,
  <Page03 />,
  <Page04 />,
  <Page05 />,
  <Page06 />,
];

const StepTitles = [
  'Accomodation type',
  'Capacity',
  'Price',
  'Location',
  'Picture',
  'Description',
];

export const defaultListingFormValues = {
  pictureUrl: null,
  picture: null,
  name: '',
  category: '',
  description: '',
  price: 0,
  beds: 0,
  guests: 0,
  latitude: 0,
  longitude: 0,
  amenities: [],
};

export class ListingForm extends React.PureComponent<Props, State> {
  state = {
    page: 0,
  };

  nextPage = () => this.setState((state) => ({ page: state.page + 1 }));
  previousPage = () => this.setState((state) => ({ page: state.page - 1 }));

  render() {
    const { submit, initialValues = defaultListingFormValues } = this.props;

    return (
      <>
        <Header>
          Step {this.state.page + 1} : {StepTitles[this.state.page]}
        </Header>
        <Formik<ListingFormValues>
          initialValues={initialValues}
          onSubmit={submit}
        >
          {({ isSubmitting, values }) => (
            <Form style={{ display: 'flex' }}>
              <div style={{ width: 550, margin: 'auto' }}>
                {pages[this.state.page]}
                <FormItem>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    {this.state.page !== 0 && (
                      <div
                        style={{
                          marginRight: '5px',
                        }}
                      >
                        <Button onClick={this.previousPage}>back</Button>
                      </div>
                    )}
                    {this.state.page === pages.length - 1 ? (
                      <div>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={isSubmitting}
                        >
                          create listing
                        </Button>
                      </div>
                    ) : (
                      <Button type="primary" onClick={this.nextPage}>
                        Next
                      </Button>
                    )}
                  </div>
                </FormItem>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
