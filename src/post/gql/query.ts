import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query ($limit: Int!, $offset: Int, $postTypeIds: [String!], $reverse: Boolean) {
    posts(limit: $limit, offset: $offset, postTypeIds: $postTypeIds, reverse: $reverse) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        id
        title
        description
        createdAt
        slug
        publishedAt
        reactionsCount
        reactions {
          reacted
        }
        postType {
          name
        }
        fields {
          key
          value
        }
        tags {
          title
        }
        createdBy {
          member {
            username
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query ($id: ID!) {
    post(id: $id) {
      reactionsCount
      reactions {
        reacted
      }
      publishedAt
      attachments {
        downloadUrl
        extension
        id
        name
        size
        url
      }
      postType {
        name
      }
      fields {
        key
        value
      }
      tags {
        title
      }
      mappingFields {
        key
        type
        value
      }
      seoDetail {
        description
        image
        title
      }
      customSeoDetail {
        description
        noIndex
        title
      }
      createdBy {
        member {
          username
        }
      }
    }
  }
`;
