/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface MessageInput {
  text: string;
  listingId: string;
}

export interface SearchListingsInput {
  guests?: number | null;
  beds?: number | null;
  name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

export interface UpdateListingInput {
  name?: string | null;
  picture?: any | null;
  pictureUrl?: string | null;
  category?: string | null;
  description?: string | null;
  price?: number | null;
  beds?: number | null;
  guests?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  amenities?: string[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
