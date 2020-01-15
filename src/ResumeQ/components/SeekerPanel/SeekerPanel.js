import React from 'react'

import AcceptedReviews from './subs/AcceptedReviews'
import DeniedReviews from './subs/DeniedReviews'

import './SeekerPanel.scss'

const SeekerPanel = () => {

    return ( 

        <div className="seeker-panel-list">
            <div className='accepted-container'>
                <h1>Accepted Reviews</h1>
                <AcceptedReviews />
            </div>
            <div className='denied-container'>
                <h1>Denied Reviews</h1>
                <DeniedReviews />
            </div>
        </div>
        )}

export default SeekerPanel