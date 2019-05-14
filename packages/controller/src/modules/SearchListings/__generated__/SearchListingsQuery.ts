/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchListingsInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: SearchListingsQuery
// ====================================================

export interface SearchListingsQuery_searchListings_owner {
  __typename: "User";
  id: string;
  email: string;
}

export interface SearchListingsQuery_searchListings {
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
  owner: SearchListingsQuery_searchListings_owner;
}

export interface SearchListingsQuery {
  searchListings: SearchListingsQuery_searchListings[];
}

export interface SearchListingsQueryVariables {
  input?: SearchListingsInput | null;
  offset: number;
  limit: number;
}
