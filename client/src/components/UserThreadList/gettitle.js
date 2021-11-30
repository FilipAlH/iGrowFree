import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_THREAD } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const GetTitle = ({ info }) => {
    const { loading, data } = useQuery(QUERY_SINGLE_THREAD, {
        variables: { threadId: info }
    });


    console.log(data)

    console.log(info)
    return (
        <><div>
            <h4 className="font-semibold text-xl leading-tight text-center truncate mb-2">{data?.thread.ThreadTitle} </h4>
        </div><div className="mt-2 p-4 mb-4" style={{
            fontSize: '18px',
            border: '2px solid #1a1a1a',
            lineHeight: '1.5',
        }}>
                {data?.thread.ThreadText}
            </div></>
    )

}

export default GetTitle;