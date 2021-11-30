import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THREADS } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import ListItem from './listitem';

const UserThreadList = () => {
    // const authUser = Auth.getProfile().data.username;

    const threadQuery = useQuery(QUERY_THREADS);
    const userQuery = useQuery(QUERY_ME);

    const loading = threadQuery.loading || userQuery.loading;

    // const thread = threadQuery?.data;
    const users = userQuery?.data;

    const usersArr = users?.me

    if (loading) {
        return <div>Loading...</div>;

    } else {
        // console.log(thread?.threads, usersArr, users?.me[2].userThreads[0]._id)
        //console.log(users?.me[4].userThreads)

    }

    // let userThreadsArr = [];
    let usersWithThreads = [];
    usersArr.forEach((user, index) => {

        if (users?.me[index].userThreads) {

            usersWithThreads.push(user)
        }
    });

    // usersWithThreads.forEach((usersThreads, index) => {
    //     userThreadsArr.push(<li key={index}>{usersThreads}</li>)
    // });
    console.log(usersWithThreads)
    let info = [];
    usersWithThreads.forEach((user) => {
        for (let i = 0; i < user.userThreads.length; i++) {
            info.push({ name: user.username, thread: user.userThreads[i] })
        }
    })
    console.log(info)
    return (
        <div>
            {info && info.map((info, index) => (
                <ListItem info={info} index={index} />
            ))}
        </div>
    )

}

export default UserThreadList;