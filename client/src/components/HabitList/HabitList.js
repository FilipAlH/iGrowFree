
import {React, useState} from 'react';
// import { useParams } from 'react-router-dom'; when tying a user to a habit
import { useQuery } from '@apollo/client';

import { QUERY_HABITS} from '../utils/queries';

function HabitList () {
    const [habits, setHabits] = useState([]);
    const {loading,  data } = useQuery(QUERY_HABITS)

   
    const getData = function() {
        if (loading) {

        } else {
            const returnedData = data?.habits || [];
            setHabits(returnedData);
            console.log(returnedData[0].habitName);
        }
    }

    return (
    
    
    <div>
        <h3> HabitList </h3>

        <button onClick={getData}>Click me</button>

    <h3> { data[0].habitName} </h3>
    </div>
    )
}

export default HabitList;