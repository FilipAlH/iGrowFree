import React from "react";

import { useQuery } from '@apollo/client';

import ThreadList from '../components/ThreadList';
import ThreadForm from '../components/ThreadForm';

import { QUERY_THREADS } from '../utils/queries';

const BlogThreads = () => {
  const { loading, data } = useQuery(QUERY_THREADS);

  const threads = data?.threads || [];
  console.log(threads)

  // if (error) return `Error! ${error.message}`;

  return (
    <div className="pt-6 pb-12" >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <><div>
          <ThreadForm />
        </div>
          <div>
            <div>
              <h2 className="font-semibold text-lg text-center leading-tight underline truncate mt-4">Blog feed...</h2></div><ThreadList
              threads={threads}
              title />
          </div></>
      )}
    </div>
  )
}

export default BlogThreads;