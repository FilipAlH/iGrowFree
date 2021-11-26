import React from 'react'
import { useQuery } from '@apollo/client'

import Lifestylepreview from '../components/Lifestyle/Lifestylepreview'

import { QUERY_LIFESTYLES } from '../utils/queries'

const Home = () => {
    const { loading, data } = useQuery(QUERY_LIFESTYLES)
    const lifeStyles = data?.lifeStyles || []
    console.log(lifeStyles)

    return(
        <main>
            {loading ? (<h3>Loading...</h3>) : 
            (
                <Lifestylepreview lifeStyles = {lifeStyles}/>
            )}
        </main>
    )
}

export default Home