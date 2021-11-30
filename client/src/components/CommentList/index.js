import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className="py-2 px-4 font-medium text-center text-gray-500 text-xl rounded">No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="font-semibold text-lg leading-tight truncate mb-2"
        style={{ borderBottom: '2px solid #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="font-semibold text-lg leading-tight underline truncate">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <div className="mt-2 p-4" style={{
                  fontSize: '20px',
                  border: '2px solid #1a1a1a',
                  lineHeight: '1.5',
                }}>
                  <p className="card-body">{comment.commentText}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;