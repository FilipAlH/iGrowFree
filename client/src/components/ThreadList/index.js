import React from 'react';
import { Link } from 'react-router-dom';


const ThreadList = ({
  threads,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!threads.length) {
    return <h3>No Threads Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {threads &&
        threads.map((thread) => (

          <div key={thread._id} className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-80 bg-opacity-60">


            <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
              <h4 className="font-semibold text-lg leading-tight underline truncate mb-2">{thread.ThreadTitle} </h4>
              {showUsername ? (
                <><Link
                  className="font-semibold text-lg leading-tight underline truncate"
                  to={`/profiles/${thread.ThreadAuthor.username}`}
                > Created by-
                  {thread.ThreadAuthor.username}</Link><br /><span className="text-sm text-gray-700 font-semibold mt-2">
                    Created on {thread.createdAt}
                  </span></>

              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thread on {thread.createdAt}
                  </span>
                </>
              )}
              <div className="mt-2 p-4" style={{
                fontSize: '20px',
                border: '2px solid #1a1a1a',
                lineHeight: '1.5',
              }}>
                <p>{thread.ThreadText}</p>
              </div>
              <Link
                className="flex justify-center w-40 py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                to={`/threads/${thread._id}`}
              >
                Join this post.
              </Link>
            </div>
          </div>

        ))
      }
    </div >
  );
};

export default ThreadList;