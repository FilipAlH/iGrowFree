import { React } from 'react';
import { useQuery } from '@apollo/client';
import Habits from '../components/HabitList/habit'
import HabitList from '../components/HabitList/HabitList'
import HabitForm from '../components/HabitForm/HabitForm';
import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';


const Habit = () => {
    const { loading, data } = useQuery(QUERY_USER, {
        variables: {
            username: Auth.getProfile().data.username
        }
    });
    const user = data?.user || []
    const habitData = data?.user.userDefinedHabits || []
    console.log()

    return (
        <div className="w-screen">
            <h3 className="mt-6 text-center text-3xl font-bold text-gray-600 mb-10">Habit List:</h3>
            <div className="lg:flex items-center justify-center w-screen">
                <div className="lg:w-8/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-2 shadow rounded bg-opacity-60">
                    {/* {habitData.map(habit => { */}
                    {/* return ( */}
                    <div>
                        <p className="" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <ul style={{ marginLeft: '20px' }}>
                                <Habits user={user} />
                            </ul>
                            <HabitList habit={habitData} />
                        </p>

                    </div>
                    {/* ) */}
                    {/* })} */}
                    <HabitForm />
                </div>
            </div>
        </div >
    )
}


export default Habit;