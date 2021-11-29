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
        <footer className="h-20  bg-blue-500">
            {loading ?
                <div>Loading...</div>
                :
                <div className="text-center mt-4 bg-blue-500">
                    <Quote quotes={quotes} />
                </div>}
        </footer>
    )
}


export default Footer;