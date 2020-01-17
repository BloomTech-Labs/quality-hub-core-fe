import React from 'react'

import AcceptedReviews from './subs/AcceptedReviews'
import DeniedReviews from './subs/DeniedReviews'

import './SeekerPanel.scss'
import { MarketplacePanels } from '../Marketplace/ReviewerList/subs/2_Panels/MarketplacePanels'

//SVG IMAGE
import resumeQ2 from '../../../global/icons/resumeQ2.svg'



const SeekerPanel = () => {

    function openTab(tab) {
        let tabs = document.getElementsByClassName('requestTab');
        for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
        }
        document.getElementById(tab).style.display = 'block';
      }

    return ( 
    <div className="seeker-panel-container">
        <div className="seeker-panel-list">
            <MarketplacePanels />

            <div className='SeekerQNav-row'>
                <button onClick={() => openTab('accepted')} className='SeekerQNav-btn'>Accepted</button>
                <button onClick={() => openTab('denied')} className='SeekerQNav-btn'>Denied</button>
            </div>

            <div id='accepted' className='requestTab'>
                <h1>Accepted Reviews</h1>
                <AcceptedReviews />
            </div>
            <div id='denied' className='requestTab' style={{display: 'none'}}>
                <h1>Denied Reviews</h1>
                <DeniedReviews />
            </div>
        </div>

        <div className='resumeQ1'>
            <img src={resumeQ2} />
        </div>

        </div>
        )}

export default SeekerPanel