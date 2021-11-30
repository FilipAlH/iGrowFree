import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_USER_HABIT } from '../../utils/mutations';
import { QUERY_HABITS, QUERY_USER } from '../../utils/queries';

import Auth from '../../utils/auth';

const HabitForm = () => {
  const [formStateName, setformStateName] = useState({ habitName: '' });
  const [formStateFrequency, setformStateFrequency] = useState({ frequency: 0 });
  const [addHabitList, { error }] = useMutation(ADD_USER_HABIT);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    console.log({ ...formStateName, ...formStateFrequency })
    try {

      const { data } = await addHabitList({
        variables: { username: Auth.getProfile().data.username, habit: formStateName.habitName, frequency: Number(formStateFrequency.frequency) },
      });

    } catch (err) {
      console.error(err);
    }

    setformStateName({ habitName: '' })
    setformStateFrequency({ frequency: 0 })
  };
  const handleChangeName = (event) => {
    const { value } = event.target;
    setformStateName({ habitName: (value) })
  };
  const handleChangeFrequency = (event) => {
    const { value } = event.target;
    setformStateFrequency({ frequency: (value), })
  };

  return (
    <div>
      <h3>Add Habit</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
          // onSubmit={handleFormSubmit}
          >
            <div className="w-full overflow-hidden bg-primary text-light p-2 m-0">
              <textarea
                name="HabitName"
                placeholder="Here's a new Habit..."
                value={formStateName.habitName}
                onChange={handleChangeName}
              ></textarea>
            </div>
            <div className="w-full overflow-hidden bg-primary text-light p-2 m-0">
              <textarea
                name="frequency"
                placeholder="Times per week?"
                value={formStateFrequency.frequency}
                onChange={handleChangeFrequency}
              ></textarea>
            </div>

            <div className="w-full overflow-hidden">
              <button className="flex justify-left w-40 py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleFormSubmit} type="submit">
                Add Habit
              </button>
            </div>
            {error && (
              <div className="w-full overflow-hidden">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to create New Habits. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default HabitForm;
