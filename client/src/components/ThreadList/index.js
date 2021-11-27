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
          <div key={thread._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thread.ThreadAuthor.username}`}
                >
                  {thread.ThreadAuthor.username} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thread on {thread.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thread on {thread.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thread.ThreadText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/threads/${thread._id}`}
            >
              Join the discussion on this thread.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThreadList;