import { gql } from '@apollo/client';


export const ADD_THREAD = gql`
  mutation addThread($threadText: String!, $threadTitle: String!) {
    addthread(threadText: $threadText, threadTitle: $threadTitle) {
      _id
      ThreadTitle
      ThreadText
      ThreadAuthor
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
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $userLifeStyle: String! $password: String!) {
        addUser(username: $username, email: $email, userLifeStyle: $userLifeStyle password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }

`;

export const ADD_HABIT = gql`
    mutation addHabit($habitName: String!, $frequency: Int!) {
        addHabit(habitName: $habitName, frequency: $frequency) {
        _id
        habitName
        frequency
        createdAt
        lifeStyles {
          _id
        }
      }
    }
`;

export const REMOVE_HABIT = gql`
    mutation removeHabit($habitId: String!) {
        removeHabit(habitId: $habitId) {
        _id
        habitName
      }
    }
`;

export const UPDATE_HABIT_STATE = gql`
  mutation updateUser($username: String!, $habit: String!, $state:[[Int!]]) {
    updateUser(username:$username, habit:$habit, state:$state) {
      checkListHabits{
        Name
        State
      }	
    }
  }
`

export const DELETE_HABIT_STATE = gql`
  mutation deleteHabitState($username: String!, $habit: String!) {
    deleteHabitState(username:$username, habit:$habit) {
      checkListHabits{
        Name
      }	
    }
  }
`

export const ADD_HABIT_LIST = gql`
  mutation addHabitList($habitName: String!, $frequency: Int!) {
    addHabitList(habitName: $habitName, frequency: $frequency) {
    _id
    habitName
    frequency
    createdAt
    }
  }
`


