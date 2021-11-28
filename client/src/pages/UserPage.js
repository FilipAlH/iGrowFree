import React from 'react';
import { useQuery } from '@apollo/client';

import ThreadList from '../components/ThreadList/index';
import ThreadForm from '../components/ThreadForm/index';

import { QUERY_THREADS } from '../utils/queries';

const UserPage = () => {
    const { loading, data } = useQuery(QUERY_THREADS);
    const threads = data?.threads || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div
                    className="col-12 col-md-10 mb-3 p-3"
                    style={{ border: '1px dotted #1a1a1a' }}
                >
                    <ThreadForm />
                </div>
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ThreadList
                            threads={threads}
                            title="Some Feed for thread(s)..."
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default UserPage;