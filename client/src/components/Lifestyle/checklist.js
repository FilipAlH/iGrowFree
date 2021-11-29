import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_LIFESTYLE } from '../../utils/queries'
import Checklists from './checklists';

export default ({user}) => {
    console.log(user.userLifeStyle)
    const userlifestyle = user.userLifeStyle
    const { loading, data } = useQuery(QUERY_LIFESTYLE, {
        variables: { LifeStyle: userlifestyle}
    })
    console.log(data)
    const lifestyle = data?.lifeStyle.LifeStyleHabits || []
    console.log(lifestyle)

    const allHabits = []

    lifestyle.forEach(habit => {
        allHabits.push({ name: habit.habitName, frequency: habit.frequency})
    });
    console.log(allHabits)

    const allChecklists = []

    for(let i = 0; i < allHabits.length; i++){
        const checkList = [allHabits[i].name]
        
        for(let j = 0; j < allHabits[i].frequency; j++){
            checkList.push({_id: j, label: `Day ${j +1}`})
        }
        console.log(checkList)
        allChecklists.push(checkList)
    }

    console.log(allChecklists)
    
    return (
        <div>
            {allChecklists && allChecklists.map((checklist) => (
                <Checklists checkList = {checklist} />
            ))}
        </div> 
    );
  };
  
  