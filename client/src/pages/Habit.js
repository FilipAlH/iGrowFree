import { React } from 'react';
import { useQuery } from '@apollo/client';

//import HabitList from '../components/HabitList/HabitList';
// import HabitForm from '../components/HabitForm';
import Auth from '../utils/auth';
// import { QUERY_USER } from '../utils/queries';
import { QUERY_HABITS } from '../utils/queries';
// import Checklist from './checklist'

const Habit = () => {
    const { loading, data } = useQuery(QUERY_HABITS);
    const habitData = data?.habits || []

    return (
        <div className="w-screen">
            <h3>Habit List</h3>
            {habitData.map(habit=>{
                return(
                    <div>
                        <h3>{habit.habitName} {habit.frequency}</h3>
                        
                    </div>
                )
            })}
        </div>

    )
}


export default Habit;