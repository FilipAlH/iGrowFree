import { gql } from '@apollo/client';


export const QUERY_THREADS = gql`
query getThreads {
  threads {
    _id
    ThreadTitle
    ThreadText
    ThreadAuthor{
      _id
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
    ThreadTitle
    ThreadText
    ThreadAuthor{
      _id
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
      userLifeStyle
      userThreads{
        _id
      }
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
  lifeStyle(lifeStyleType: $LifeStyle) {
      lifeStyleType
      LifeStyleHabits {
        habitName
        frequency
        
      }
  }
}
`;

export const QUERY_LIFESTYLES = gql`
    query getLifeStyles {
        lifeStyles {
            lifeStyleType
            LifeStyleHabits {
              habitName
              frequency
              
            }
        }
    }
`;

export const QUERY_USER = gql`
query user ($username: String!) {
  user (username:$username) {
      username
      userLifeStyle
      checkListHabits {
        Name
        State
      }
      userDefinedHabits {
        habitName
        frequency
      }
      userCheckListHabits {
        Name
        State        
      }
  }
}
`;

export const QUERY_QUOTES = gql`
query {
  quotes{
    _id
    author
    description
  }
}
`;

export const HabitList = gql`
query quotesList{
  quotes{
    _id
    author
    description
  }
}`
