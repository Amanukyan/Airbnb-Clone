// @ts-ignore
import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { MeQuery, MeQuery_me } from '@airbnb-clone/controller';

// export interface WithCurrentUser {
//   user: FindListingsQuery_findListings[];
//   loading: boolean;
// }

const meQuery = gql`
  query MeQuery {
    me {
      email
      firstName
      lastName
    }
  }
`;

export interface WithCurrentUser {
  me: MeQuery_me | null;
  loading: boolean;
}

export const withCurrentUser = graphql<any, MeQuery, {}, WithCurrentUser>(
  meQuery,
  {
    props: ({ data }) => {
      if (data && !data.loading && data.me) {
        const me: MeQuery_me = data.me;
        return {
          me,
          loading: data ? data.loading : false,
        };
      }
      return {
        me: null,
        loading: false,
      };
    },
  },
);
