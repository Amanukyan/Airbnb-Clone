/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewListingQuery
// ====================================================

export interface ViewListingQuery_viewListing_owner {
  __typename: "User";
  id: string;
  email: string;
}

export interface ViewListingQuery_viewListing {
  __typename: "Listing";
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  longitude: number;
  latitude: number;
  amenities: string[];
  pictureUrl: string;
  owner: ViewListingQuery_viewListing_owner;
}

export interface ViewListingQuery {
  viewListing: ViewListingQuery_viewListing | null;
}

export interface ViewListingQueryVariables {
  id: string;
}
