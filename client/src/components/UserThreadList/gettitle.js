import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_THREAD } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const GetTitle = ({info}) => {
    const { loading, data } = useQuery(QUERY_SINGLE_THREAD, {
        variables: {threadId: info}
    });


console.log(data)

console.log(info)
    return (
        <div>
            hello{data?.thread.ThreadTitle}
        </div>
    )

}

export default GetTitle;