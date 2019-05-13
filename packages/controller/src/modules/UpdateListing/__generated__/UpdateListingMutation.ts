/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateListingInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateListingMutation
// ====================================================

export interface UpdateListingMutation {
  updateListing: boolean;
}

export interface UpdateListingMutationVariables {
  listingId: string;
  input: UpdateListingInput;
}
