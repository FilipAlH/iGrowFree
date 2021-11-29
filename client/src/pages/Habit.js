import { React } from 'react';
import { useQuery } from '@apollo/client';

import HabitForm from '../components/HabitForm/HabitForm';
// import Auth from '../utils/auth';
import { QUERY_HABITS } from '../utils/queries';


const Habit = () => {
    const { loading, data } = useQuery(QUERY_HABITS);
    const habitData = data?.habits || []
    if(!loading) {
        console.log('Not loading Habit List')
    }
      
    
    return (
        <div className="w-screen">
            <h3 className="mt-6 text-center text-3xl font-bold text-gray-600 mb-10">Habit List:</h3>
            <div className="lg:flex items-center justify-center w-screen">
                <div className="lg:w-3/12 lg:mr-7 lg:ml-7 lg:mb-0 mb-7 bg-white p-6 shadow-xl sm:rounded-xl sm:p-10 bg-opacity-60">
                    {habitData.map(habit => {
                        return (
                            <div>
                                <h3 className="text-gray-600 text-lg text-base text-center">-{habit.habitName} {habit.frequency}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default Habit;