import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THREADS } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import GetTitle from './gettitle';

const listItem = ({info, index}) => {
    return (
        
        <li key={index} class="list-none">
            <div>
            <div className="lg:flex items-center justify-center w-screen">
                    <div className="lg:w-8/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-2 shadow rounded bg-opacity-60">
                        <div className="flex items-center border-b border-gray-200 pb-6">
                            <div className="flex items-start justify-between w-full">
                                <div className="pl-3 w-full">
                                    {/* get titles for user threads */}
                                    <div className="max-w-sm mx-auto flex items-start">
                                        <GetTitle info={info.thread._id}/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </li>
    )
}

export default listItem;