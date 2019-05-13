/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NewMessageSubscription
// ====================================================

export interface NewMessageSubscription_newMessage_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface NewMessageSubscription_newMessage {
  __typename: "Message";
  text: string;
  user: NewMessageSubscription_newMessage_user;
  listingId: string;
}

export interface NewMessageSubscription {
  newMessage: NewMessageSubscription_newMessage;
}

export interface NewMessageSubscriptionVariables {
  listingId: string;
}
