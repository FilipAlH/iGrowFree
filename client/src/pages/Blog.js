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
    <div className="pt-6 pb-12" style={{
      background: `url("https://picsum.photos/id/1018/1000")`, backgroundSize: 'cover', backgroundAttachment: 'fixed'
    }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <><div>
          <ThreadForm />
        </div>
          <div>
            <div>
              <div className="w-100 py-4 px-6 mt-4 text-gray-800 flex flex-col mx-80 justify-between bg-white rounded-lg shadow-xl bg-opacity-60">
                <h2 className="font-bold text-xl text-center leading-tight underline truncate mt-4">Blog feed</h2></div></div><ThreadList
              threads={threads}
              title />
          </div></>
      )}
    </div>
  )
}

export default BlogThreads;