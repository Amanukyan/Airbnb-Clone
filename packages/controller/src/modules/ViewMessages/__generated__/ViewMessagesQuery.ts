/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewMessagesQuery
// ====================================================

export interface ViewMessagesQuery_messages_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface ViewMessagesQuery_messages {
  __typename: "Message";
  text: string;
  user: ViewMessagesQuery_messages_user;
  listingId: string;
}

export interface ViewMessagesQuery {
  messages: ViewMessagesQuery_messages[];
}

export interface ViewMessagesQueryVariables {
  listingId: string;
}
