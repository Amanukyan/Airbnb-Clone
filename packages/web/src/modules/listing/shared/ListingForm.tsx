import * as React from 'react';
import { Form as AntForm, Button } from 'antd';
import { Form, Formik, FormikActions } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';

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

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  height: 60px;
  border-top: #f1f1f1 solid;
  display: flex;
  align-items: center;
  justify-content: center;
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
  beds: 1,
  guests: 1,
  latitude: 0,
  longitude: 0,
  amenities: [],
};

// const fieldsByStep = [
//   ['category'],
//   ['guests', 'beds'],
//   ['price'],
//   ['latitude', 'longitude'],
//   ['picture'],
//   ['description', 'name'],
// ];

const validStep1Schema = yup.object().shape({
  category: yup
    .string()
    .min(1)
    .required('Please select an option'),
});

const validStep2Schema = yup.object().shape({
  guests: yup
    .number()
    .min(1, ' ')
    .required(' '),
  beds: yup
    .number()
    .min(1)
    .required(),
});

const validStep3Schema = yup.object().shape({
  price: yup
    .number()
    .min(1, ' ')
    .required(' '),
});

const validStep4Schema = yup.object().shape({
  latitude: yup
    .number()
    .notOneOf([0], 'Please choose a location')
    .required('Please choose a location'),
  longitude: yup
    .number()
    .notOneOf([0], 'Please choose a location')
    .required('Please choose a location'),
});

const validStep5Schema = yup.object().shape({
  picture: yup.mixed().required('At least one picture is required'),
  // .test(
  //   'fileSize',
  //   'File Size is too large',
  //   (value) => value.size <= FILE_SIZE,
  // )
});

const validStep6Schema = yup.object().shape({
  name: yup.string().required('Please write a name'),
  description: yup.string().required('Please write a descritption'),
});

const validSchemaArray = [
  validStep1Schema,
  validStep2Schema,
  validStep3Schema,
  validStep4Schema,
  validStep5Schema,
  validStep6Schema,
];

export class ListingForm extends React.PureComponent<Props, State> {
  state = {
    page: 0,
  };

  nextPage = async (validateForm: any, values: any) => {
    const { page } = this.state;
    const errors = await validateForm(values);

    if (Object.keys(errors).length === 0) {
      this.setState({ page: page + 1 });
    }
  };

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
          validationSchema={validSchemaArray[this.state.page]}
        >
          {({ isSubmitting, values, setErrors, validateForm }) => (
            <Form style={{ display: 'flex' }}>
              <div style={{ width: 550, margin: 'auto' }}>
                {pages[this.state.page]}
                <Footer>
                  <FormItem
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      marginBottom: 0,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: 550,
                      }}
                    >
                      {this.state.page !== 0 && (
                        <div
                          style={{
                            marginRight: '5px',
                          }}
                        >
                          <Button
                            onClick={() => {
                              setErrors({});
                              this.previousPage();
                            }}
                          >
                            back
                          </Button>
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
                        <Button
                          type="primary"
                          onClick={() => this.nextPage(validateForm, values)}
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </FormItem>
                </Footer>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
