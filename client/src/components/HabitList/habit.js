import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_LIFESTYLE } from '../../utils/queries'

const Habits = ({ user }) => {
    console.log(user)
    return (
        <div className="flex flex-col">
            {user.userDefinedHabits && user.userDefinedHabits.map((habit) => (
                <li className="pb-3 mt-5 text-xl font-bold underline text-base" key={habit.habitName}>{habit.habitName}:</li>
            ))}
        </div>
    )
}

export default Habits