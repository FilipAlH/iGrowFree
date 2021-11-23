import { gql } from '@apollo/client';


export const QUERY_THREADS = gql`
  query getThreads {
    threads {
      _id
      threadText
      threadAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THREAD = gql`
  query getSingleThread($threadId: ID!) {
    thread(threadId: $threadId) {
      _id
      threadText
      threadAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    `;

export const QUERY_ME = gql`
  query me{
    me {
      username

    }
  }
`;