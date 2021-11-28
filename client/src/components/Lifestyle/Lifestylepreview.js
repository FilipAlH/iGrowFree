import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Auth from '../../utils/auth';
import { QUERY_USER } from '../../utils/queries'
import Userlifestyle from './userlifestylepreview';

const Lifestylepreview = ({ lifeStyles = [] }) => {
    lifeStyles.forEach(lifestyle => {
        console.log(lifestyle.lifeStyleType, lifestyle.LifeStyleHabits)
    });
    
    if (!lifeStyles.length) {
        return <h3>nothing to see here...</h3>
    } else if (Auth.loggedIn()){
        return (
            <div>
                <Userlifestyle />
            </div>
        )
    } else {
        return(
            <div className="w-screen">
                <div className="py-8 w-screen">
                <h2>What lifestyle would you want...?</h2>
                    <div className="lg:flex items-center justify-center w-screen">
                        {lifeStyles && 
                            lifeStyles.map((lifestyle) => (
                                <div className="lg:w-3/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded" key={lifestyle._id}>
                                    <div className="flex items-center border-b border-gray-200 pb-6">
                                        <div className="flex items-start justify-between w-full">
                                            <div className="pl-3 w-full">
                                                <p className="text-xl font-medium leading-5 text-gray-800">{lifestyle.lifeStyleType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <p className="text-sm leading-5 py-4 text-gray-600">
                                            <ul style={{marginLeft: '20px'}}>
                                                {lifestyle.LifeStyleHabits && lifestyle.LifeStyleHabits.map((habit) => (
                                                    <li key={habit.habitName}>{habit.habitName}</li>
                                                ))}
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div> 
            )
    }
} 

export default Lifestylepreview