import { gql } from '@apollo/client';


export const ADD_THREAD = gql`
  mutation addThread($ThreadText: String!, $ThreadTitle: String!) {
    addThread(ThreadText: $ThreadText, ThreadTitle: $ThreadTitle) {
      _id
      ThreadTitle
      ThreadText
      ThreadAuthor{
        _id
      }
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
export const ADD_USER_HABIT = gql`
  mutation updateUserHabit($username: String!, $habit: String!, $frequency: Int!){
    updateUserHabit (username: $username, habit: $habit, frequency: $frequency) {
        userDefinedHabits{
          habitName
          frequency
        }
      }
  } 


`
export const DELETE_USER_HABIT_STATE = gql`
  mutation deleteUserHabitState($username: String!, $habit: String!) {
    deleteUserHabitState(username:$username, habit:$habit) {
      userCheckListHabits{
        Name
      }	
    }
  }
`
export const UPDATE_USER_HABIT_STATE = gql`
  mutation updateUserCheckListHabits($username: String!, $habit: String!, $state:[[Int!]]) {
    updateUserCheckListHabits(username:$username, habit:$habit, state:$state) {
      userCheckListHabits{
        Name
        State
      }	
    }
  }
`