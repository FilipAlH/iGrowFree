import React from "react";

export default function Quote({ quotes }) {
    var randomIndex = Math.floor(Math.random() * 11)
    console.log(quotes[randomIndex])
    // useEffect(() => {
    let selectedQuote = {
        _id: quotes[randomIndex]._id,
        author: quotes[randomIndex].author,
        description: quotes[randomIndex].description
    }


    return (
        <div>
            <h6 className="text-xl">{selectedQuote.description}</h6>
            <h4>Author: {selectedQuote.author}</h4>
        </div>)
}
