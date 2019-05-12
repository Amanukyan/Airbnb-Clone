/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindListingsQuery
// ====================================================

export interface FindListingsQuery_findListings {
  __typename: "Listing";
  id: string;
  name: string;
  pictureUrl: string;
}

export interface FindListingsQuery {
  findListings: FindListingsQuery_findListings[];
}
