import { gql } from '@apollo/client';

export const LOGIN_MEMBER = gql`
  mutation ($username: String!, $password: String!) {
    loginNetwork(input: { usernameOrEmail: $username, password: $password }) {
      accessToken
    }
  }
`;
