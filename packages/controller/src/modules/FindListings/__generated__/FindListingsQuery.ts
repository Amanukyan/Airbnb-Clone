/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindListingsQuery
// ====================================================

export interface FindListingsQuery_findListings_owner {
  __typename: "User";
  id: string;
  email: string;
}

export interface FindListingsQuery_findListings {
  __typename: "Listing";
  id: string;
  name: string;
  pictureUrl: string;
  owner: FindListingsQuery_findListings_owner;
}

export interface FindListingsQuery {
  findListings: FindListingsQuery_findListings[];
}
