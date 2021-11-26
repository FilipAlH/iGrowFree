import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THREAD } from '../../utils/mutations';
import { QUERY_ME, QUERY_THREADS } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThreadForm = () => {
  const [ThreadText, setThreadText] = useState('');
  const [ThreadTitle, setThreadTitle] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addThread, { error }] = useMutation(ADD_THREAD, {
    update(cache, { data: { addThread } }) {
      try {
        const { threads } = cache.readQuery({ query: QUERY_THREADS });

        cache.writeQuery({
          query: QUERY_THREADS,
          data: { threads: [addThread, ...threads] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, threads: [...me.threads, addThread] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        // getProfile() is unknown so data wont get read
      const { data } = await addThread({
        variables: {
          ThreadText,
          ThreadTitle,
          ThreadAuthor: Auth.getProfile().data.username,
        },
      });

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
    <div>
      <h3>Create a Thread of Your Own!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 1000 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/1000
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="ThreadTitle"
                placeholder="Create thread title here..."
                value={ThreadTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChangeTitle}
              ></textarea>
            </div>

            <div className="col-12 col-lg-9">
              <textarea
                name="ThreadText"
                placeholder="Create thread here..."
                value={ThreadText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Thread
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
          You need to be logged in to make a thread. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThreadForm;