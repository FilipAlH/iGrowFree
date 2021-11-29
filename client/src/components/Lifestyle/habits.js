import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_LIFESTYLE } from '../../utils/queries'

const Habits = ({ user }) => {
    console.log(user.userLifeStyle)
    const userlifestyle = user.userLifeStyle
    const { loading, data } = useQuery(QUERY_LIFESTYLE, {
        variables: { LifeStyle: userlifestyle }
    })
    console.log(data)
    const lifestyle = data?.lifeStyle || []
    console.log(lifestyle)

    return (
        <div className="flex flex-col">
            {lifestyle.LifeStyleHabits && lifestyle.LifeStyleHabits.map((habit) => (
                <li className="pb-3 mt-5 text-xl font-bold underline text-base" key={habit.habitName}>{habit.habitName}:</li>
            ))}
        </div>
    )
}

export default Habits