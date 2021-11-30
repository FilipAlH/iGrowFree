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
    } else if (Auth.loggedIn()) {
        return (
            <div>
                <Userlifestyle />
            </div>
        )
    } else {
        return (
            <div className="w-screen h-auto">
                <div className="py-8 w-screen">
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-600 mb-10">What lifestyle would you want...?</h2>
                    <div className="lg:flex items-center justify-center w-screen">
                        {lifeStyles &&
                            lifeStyles.map((lifestyle) => (
                                <div className="lg:w-3/12 lg:mr-7 lg:ml-7 lg:mb-0 mb-7 bg-white p-6 shadow-xl sm:rounded-xl sm:p-10 bg-opacity-60" key={lifestyle._id}>
                                    <div className="rounded sm:rounded-xl overflow-hidden shadow-lg bg-opacity-60">
                                        <div className="px-6 py-4">
                                            <div className="">
                                                <p className="text-gray-600 text-xl font-bold text-base text-center ">{lifestyle.lifeStyleType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <p className="text-500 text-base">
                                            <ul style={{ marginLeft: '10px' }}>
                                                {lifestyle.LifeStyleHabits && lifestyle.LifeStyleHabits.map((habit) => (
                                                    <li key={habit.habitName}> - {habit.habitName}</li>
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