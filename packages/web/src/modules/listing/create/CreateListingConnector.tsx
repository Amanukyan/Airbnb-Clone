import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FormikActions } from 'formik';
import { withCreateListing, WithCreateListing } from '@airbnb-clone/controller';
import { ListingFormValues, ListingForm } from '../shared/ListingForm';

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListing
> {
  submit = async (
    values: ListingFormValues,
    { setSubmitting }: FormikActions<ListingFormValues>,
  ) => {
    const { history } = this.props;
    await this.props.createListing(values);
    setSubmitting(false);
    history.push('/');
  };

  render() {
    return <ListingForm submit={this.submit} />;
  }
}

export const CreateListingConnector = withCreateListing(C);
