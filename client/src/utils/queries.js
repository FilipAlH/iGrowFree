import { gql } from '@apollo/client';


export const QUERY_THREADS = gql`
query getThreads {
  threads {
    _id
    ThreadText
    ThreadAuthor{
      username
    }
    createdAt
  }
}
`;

export const QUERY_SINGLE_THREAD = gql`
query getSingleThread($threadId: ID!) {
  thread(threadId: $threadId) {
    _id
    ThreadText
    ThreadAuthor{
      username
    }
    createdAt
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
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
      frequency
      createdAt
    }
  }
`;
export const QUERY_SINGLE_HABIT = gql`
  query getSingleHabit ($habitId: ID!) {
    habit {
      _id
      habitName
      frequency
      createdAt
      LifeStyles {
        _id
      }
    }
  }
`;

export const QUERY_LIFESTYLE = gql`
    query getLifeStyle($LifeStyle: String!) {
        lifeStyle(LifeStyleType: $LifeStyle) {
            LifeStyleType
            LifeStyleHabits {
              habitName
              frequency
              
            }
        }
    }
`
export const QUERY_LIFESTYLES = gql`
    query getLifeStyles {
        lifeStyles {
            LifeStyleType
            LifeStyleHabits {
              habitName
              frequency
              
            }
        }
    }
`