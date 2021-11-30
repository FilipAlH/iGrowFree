import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { ADD_THREAD } from '../../utils/mutations';
import { QUERY_ME, QUERY_THREADS } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThreadForm = () => {
  const [ThreadText, setThreadText] = useState('');
  const [ThreadTitle, setThreadTitle] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  // const [ThreadAuthor, setThreadAuthor] = useState(Auth.getProfile().data._id)

  const [addThread, { error }] = useMutation(ADD_THREAD);
  //   , {
  //   update(cache, { data: { addThread } }) {
  //     try {
  //       const { threads } = cache.readQuery({ query: QUERY_THREADS });

  //       cache.writeQuery({
  //         query: QUERY_THREADS,
  //         data: { threads: [addThread, ...threads] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }

  //     // update me object's cache
  //     const { me } = cache.readQuery({ query: QUERY_ME });
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: { me: { ...me, threads: [...me.userThreads, addThread] } },
  //     });
  //   },
  // }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // getProfile() is unknown so data wont get read
      const { data } = await addThread({
        variables: {
          ThreadText: ThreadText,
          ThreadTitle: ThreadTitle,
        },
      }, console.log(Auth.getProfile().data._id));

      setThreadTitle('');
      setThreadText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ThreadText' && value.length <= 1000) {
      setThreadText(value);
      setCharacterCount(value.length);
    }
  };

  const handleChangeTitle = (event) => {
    const { name, value } = event.target;

    if (name === 'ThreadTitle') {
      setThreadTitle(value);
    }
  };

  return (
    <div className="flex flex-wrap overflow-hidden bg-white rounded-lg shadow-xl bg-opacity-60 mt-4 w-100 mx-80">
      <div className="w-full overflow-hidden">
        <h3 className="py-2 px-4 font-medium text-center text-gray-500 text-xl rounded ">Create your Post here!</h3>
      </div>

      {Auth.loggedIn() ? (
        <><div className="w-full overflow-hidden">
          <p
            className={`card-header bg-primary text-light p-2 ml-4  ${characterCount === 1000 || error ? 'text-danger' : ''
              }`}

          >
            Character Count: {characterCount}/1000
          </p>
          <form
            className="w-full overflow-hidden bg-primary text-center text-light p-2 m-0"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full overflow-hidden bg-primary text-center text-light  p-2 m-0">
              <textarea
                name="ThreadTitle"
                placeholder="Enter your post title"
                value={ThreadTitle}
                className="w-full overflow-hidden bg-primary text-light  p-2 m-0"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChangeTitle}
              ></textarea>
            </div>

            <div className="w-full overflow-hidden bg-primary text-center text-light  p-2 m-0">
              <textarea
                name="ThreadText"
                placeholder="Enter your post"
                value={ThreadText}
                className="w-full overflow-hidden bg-primary text-light  p-2 m-0"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <p
            className={`m-0 ${
              characterCount === 1000 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/1000
          </p>

            <div className="col-12 col-lg-3">
              <button className="flex justify-center w-40 py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                Add Thread
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </div>
        </>
      ) : (
        <div className="w-full overflow-hidden">
          <h3 className="card-header bg-primary text-center text-light p-2 m-0">
            You need to be logged in to make a thread. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </h3>
        </div>

      )}


    </div>
  );
};

export default ThreadForm;