import React from 'react'
import { useQuery } from '@apollo/client'

import { QUERY_USER } from '../../utils/queries'
import Auth from '../../utils/auth';

import Habits from './habits'
import Checklist from './checklist'

const Userlifestyle = () => {
    console.log(Auth.getProfile().data.username)
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: Auth.getProfile().data.username}
    })
    console.log(data)
    const user = data?.user || []
    
    console.log(Auth.getProfile().data)
    console.log(user)

    return (
    <div className="w-screen">
        <div className="py-8 w-screen">
            <h2>Your lifestyle:</h2>
            <div className="lg:flex items-center justify-center w-screen">
                <div className="lg:w-8/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded" key={user.username}>
                    <div className="flex items-center border-b border-gray-200 pb-6">
                        <div className="flex items-start justify-between w-full">
                            <div className="pl-3 w-full">
                                <p className="text-xl font-medium leading-5 text-gray-800">{user.userLifeStyle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-2">
                        <p className="text-sm leading-5 py-4 text-gray-600" style={{display: 'flex', flexDirection: 'row'}}>
                            <ul style={{marginLeft: '20px'}}>
                                <Habits user = {user}/>
                            </ul>
                            <Checklist user = {user}/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    )
}

export default Userlifestyle