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
        <div className="pt-6 pb-12">
            <h3>Habit List</h3>
            {habitData.map(habit=>{
                return(
                    <div>
                        <h2 className ="font-semibold text-lg text-left leading-tight truncate mt-4">
                            {habit.habitName} {habit.frequency}</h2>   
                    </div>
                )
            })}
            <div>
                <HabitForm />
            </div>
        </div>
        

    )
}


export default Habit;