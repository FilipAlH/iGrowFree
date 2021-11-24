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
export const QUERY_HABITS = gql`
  query getHabits {
    habits {
      _id
      habitName
      timeLine
      quantity
      createdAt
    }
  }
`;
export const QUERY_SINGLE_HABIT = gql`
  query getSingleHabit ($habitId: ID!) {
    habit {
      _id
      habitName
      timeLine
      quantity
      createdAt
      LifeStyles {
        _id
      }
    }
  }
`;