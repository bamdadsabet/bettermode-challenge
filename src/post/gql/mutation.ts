import { gql } from '@apollo/client';

export const ADD_REACTION = gql`
  mutation addReaction($postId: ID!, $reaction: String!) {
    addReaction(input: { reaction: $reaction }, postId: $postId) {
      status
    }
  }
`;

export const REMOVE_REACTION = gql`
  mutation removeReaction($postId: ID!, $reaction: String!) {
    removeReaction(reaction: $reaction, postId: $postId) {
      status
    }
  }
`;
