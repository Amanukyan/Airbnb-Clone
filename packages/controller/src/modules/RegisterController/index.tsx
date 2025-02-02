import * as React from 'react';
import { graphql, ChildMutateProps } from 'react-apollo';
import gql from 'graphql-tag';
import {
  RegisterMutation,
  RegisterMutationVariables,
} from './__generated__/RegisterMutation';
import { normalizeErrors } from '../../utils/normalizeErrors';
import { NormalizedErrorMap } from '../../types/NormalizedErrorMap';

interface Props {
  children: (data: {
    submit: (
      values: RegisterMutationVariables,
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    console.log(values);
    const res = await this.props.mutate({
      variables: values,
    });

    if (res && res.data) {
      const { register } = res.data;

      console.log('response: ', register);

      if (register) {
        return normalizeErrors(register);
      }
    }
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      path
      message
    }
  }
`;

export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(C);
