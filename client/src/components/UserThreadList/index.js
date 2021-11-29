import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THREADS } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';

const UserThreadList = () => {

    const threadQuery = useQuery(QUERY_THREADS);
    const userQuery = useQuery(QUERY_ME);

    const loading = threadQuery.loading || userQuery.loading;

    const thread = threadQuery?.data;
    const users = userQuery?.data;

    if (loading) {
        return <div>Loading...</div>;
    } else{
        console.log(thread, users)
        console.log(thread?.threads[0].ThreadAuthor.username)
    }

    const userThreads = [];
    // for (let i = 0; i < thread.length; i++) {
    // if(thread?.threads[i].TheadAuthor._id === users?.me[i]._id){  
    //     userThreads.push(thread?.threads[i]);
    //     console.log(userThreads)
    // }


    return (
        <div>
            {userThreads.map()}
            hey, {users?.me[0].username}
        </div>
    )

}

export default UserThreadList;