import React, { useState, useEffect } from 'react'
import Quote from '../components/Quote/Quote';

// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_QUOTES } from '../utils/queries';

const Footer = () => {
    const { loading, data } = useQuery(QUERY_QUOTES);
    const quotes = data?.quotes || []
    // const [selectedQuote, setSelectedQuote] = useState({ _id: "", author: "", description: "" })

 
        if (loading) {
            console.log("loading")
        } else {
            console.log(quotes, "Graphql get quotes route")
         
        }   


    return (
        <div className="col-12 col-md-8 mb-3">
            {loading ?
                <div>Loading...</div>
                :
                <div>
                    <Quote quotes={quotes}/>
                </div>}
        </div>
    )
}


export default Footer;