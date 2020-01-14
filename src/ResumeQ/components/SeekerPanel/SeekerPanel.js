import React from 'react'

import AcceptedReviews from './subs/AcceptedReviews'
import DeniedReviews from './subs/AcceptedReviews'

const SeekerPanel = () => {

    return ( 

        <div>
            <div>
                <h1>Accepted Reviews</h1>
                <AcceptedReviews />
            </div>
            <div>
                <h1>Denied Reviews</h1>
                <DeniedReviews />
            </div>
        </div>
        )}

export default SeekerPanel