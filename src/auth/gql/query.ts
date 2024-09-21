import { gql } from '@apollo/client/core';

export const GET_GUEST_TOKEN = gql`
  query ($domain: String!) {
    tokens(networkDomain: $domain) {
      accessToken
    }
  }
`;
