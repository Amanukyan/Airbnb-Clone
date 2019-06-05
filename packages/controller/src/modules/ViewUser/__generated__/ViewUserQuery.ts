/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewUserQuery
// ====================================================

export interface ViewUserQuery_viewUser {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ViewUserQuery {
  viewUser: ViewUserQuery_viewUser | null;
}

export interface ViewUserQueryVariables {
  id: string;
}
