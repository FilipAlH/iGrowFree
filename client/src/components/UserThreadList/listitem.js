import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THREADS } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import GetTitle from './gettitle';

const listItem = ({ info, index }) => {
    return (

        <li key={index} class="list-none">
            <div>
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-80 bg-opacity-60">
                                <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                                    {/* get titles for user threads */}
                                    <div className="">

                                        <GetTitle info={info.thread._id} />
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