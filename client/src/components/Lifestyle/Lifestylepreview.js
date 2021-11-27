import React from 'react'

const Lifestylepreview = ({ lifeStyles = [] }) => {
    lifeStyles.forEach(lifestyle => {
        console.log(lifestyle.lifeStyleType, lifestyle.LifeStyleHabits)
    });
    
    if (!lifeStyles.length) {
        return <h3>nothing to see here...</h3>
    } else {
        return(
            <div>
                <div>
                    <h3>Lifestyles to choose from:</h3>
                </div>
                <div>
                    {lifeStyles && 
                        lifeStyles.map((lifestyle) => (
                            <div key={lifestyle._id}>
                                {lifestyle.lifeStyleType}
                                <ul>
                                {lifestyle.LifeStyleHabits && lifestyle.LifeStyleHabits.map((habit) => (
                                    <li key={habit.habitName}>{habit.habitName}</li>
                                ))}
                                </ul>
                            </div>
                        )
                    )}
                </div>
            </div>
            
        )
    }
}

export default Lifestylepreview