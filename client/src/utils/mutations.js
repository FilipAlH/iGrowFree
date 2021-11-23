import { gql } from '@apollo/client';

export const ADD_THREAD = gql`
  mutation addThread($threadText: String!) {
    addthread(threadText: $threadText) {
      _id
      threadText
      threadAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($threadId: ID!, $commentText: String!) {
    addComment(threadId: $threadId, commentText: $commentText) {
      _id
      threadText
      threadAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;