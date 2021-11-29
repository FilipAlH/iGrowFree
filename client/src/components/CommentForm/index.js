import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ threadId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addComment({
        variables: {
          threadId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="flex flex-wrap w-full   rounded-lg shadow-xl bg-opacity-60 mt-4">
      <div className="w-full overflow-hidden">
        <h4 className="py-2 px-4 font-medium text-center text-gray-500 text-xl rounded" >Join the Discussion!</h4>
      </div>
      {Auth.loggedIn() ? (
        <><div className="w-full overflow-hidden">
          <p
            className={`card-header bg-primary text-light p-2 ml-4  ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p >
          <form
            className="w-full overflow-hidden bg-primary text-center text-light p-2 m-0"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full overflow-hidden bg-primary text-center text-light  p-2 m-0">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="w-full overflow-hidden bg-primary text-light  p-2 m-0"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="w-full overflow-hidden bg-primary text-center text-light  p-2 m-0">
              <button className="flex justify-center w-40 py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </div>
        </>
      ) : (
        <p>
          You need to be logged in to add a comment. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div >
  );
};

export default CommentForm;