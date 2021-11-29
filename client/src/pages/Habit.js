import React, { useState, useEffect} from 'react';
// import { useParams } from 'react-router-dom'; when tying a user to a habit
import { useQuery } from '@apollo/client';
// import HabitList from '../components/HabitList';
// import HabitForm from '../components/HabitForm';
import Auth from '../utils/auth';
import { QUERY_HABITS} from '../utils/queries';

const Habit  = () => {
    const [habits, setHabits] = useState([]);
};
//     useEffect(() => {
//         const getHabitData = async () => {
//             try {
            
//     }


//     const {loading,  data } = useQuery(QUERY_HABITS)
//     const returnedData = data?.habits || [];
//     if (loading) {
//         return <div>Loading...</div>;
//       }
//       return (
//    <>
//         <HabitList/>
//       </div>
//       <div className="m-3 p-4">
//         <HabitForm  />
//       </div>
//         );
// };

 export default Habit;