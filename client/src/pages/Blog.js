import React from "react";

import { useQuery } from '@apollo/client';

import ThreadList from '../components/ThreadList';

import { QUERY_THREADS } from '../utils/queries';

const BlogThreads = () => {
    const { loading, data } = useQuery(QUERY_THREADS);
    
    const threads = data?.threads || [];
    console.log(threads)

    // if (error) return `Error! ${error.message}`;

    return(
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThreadList
              threads={threads}
              title="Thread feed..."
            />
          )}
        </div>
    )
}

export default BlogThreads;