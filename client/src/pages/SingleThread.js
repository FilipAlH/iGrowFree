import React from "react";

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THREAD } from '../utils/queries';

const SingleThread = () => {
  const { threadId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THREAD, {
    variables: { threadId: threadId },
  });

  const thread = data?.thread || {};

  if (loading) {
    return <div>Loading...</div>;
  } else {
    console.log(thread._id)
  }

  return (
    <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-80 bg-opacity-60">
      <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
        <h3 className="font-semibold text-lg leading-tight underline truncate mb-2">
          Created by-
          {thread.ThreadAuthor.username} <br />
          <span className="text-sm text-gray-700 font-semibold mt-2">
            Created on {thread.createdAt}
          </span>
        </h3>
        <div className="bg-light py-4">
          <blockquote
            className="p-4"
            style={{
              fontSize: '1.5rem',
              border: '2px solid #1a1a1a',
              lineHeight: '1.5',
            }}
          >
            {thread.ThreadText}
          </blockquote>
        </div>

        <div className="w-full overflow-hidden">
          <CommentList comments={thread.comments} />
        </div>
        <div className="w-full overflow-hidden" style={{ border: '2px solid #1a1a1a' }}>
          <CommentForm threadId={thread._id} />
        </div>
      </div>
    </div>
  )
}

export default SingleThread;