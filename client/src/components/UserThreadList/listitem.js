import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THREADS } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import GetTitle from './gettitle';

const listItem = ({info, index}) => {
    return (
        
        <li key={index}>
            <div>
                <GetTitle info={info.thread._id}/>
            </div>
        </li>
    )
}

export default listItem;