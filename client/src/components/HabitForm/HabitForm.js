import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_HABIT } from '../../utils/mutations';
import { QUERY_HABITS } from '../../utils/queries';

import Auth from '../../utils/auth';

console.log('habitform');

const HabitForm = () => {
  const { formState, setformState } = useState({ habitName:'', frquency: 0 });
  

  const [addHabit, { error }] = useMutation(ADD_HABIT, {

    update(cache, { data: { addHabit } }) {
      try {
        const { habits } = cache.readQuery({ query: QUERY_HABITS });

        cache.writeQuery({
          query: QUERY_HABITS,
          data: { habits: [addHabit, ...habits] },
        });
      } catch (e) {
        console.error(e);
      }

      // // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, thoughts: [...me.habits, addHabit] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addHabit({
        variables: {...formState },
      });
        
    } catch (err) {
      console.error(err);
    }
    setformState({ habitName:'', frequency: 0, })
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setformState({ habitName:(value), frequency:(value), })
  };
  return (
    <div>
      <h3>Add Habit</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="HabitName"
                placeholder="Here's a new Habit..."
                value={formState.habitName}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="frequency"
                placeholder="Time per week?"
                value={formState.frequency}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Habit
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
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
