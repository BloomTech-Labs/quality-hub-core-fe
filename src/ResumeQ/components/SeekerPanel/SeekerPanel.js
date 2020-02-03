import React from 'react'

import AcceptedReviews from './subs/AcceptedReviews';
import DeniedReviews from './subs/DeniedReviews';
import History from './subs/History';

import './SeekerPanel.scss'



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

                <div className='SeekerQNav-row'>
                    <button onClick={() => openTab('accepted')} className='SeekerQNav-btn'>Accepted</button>
                    <button onClick={() => openTab('denied')} className='SeekerQNav-btn'>Denied</button>
                    <button onClick={() => openTab('history')} className='SeekerQNav-btn'>History</button>
                </div>

                <div id='accepted' className='requestTab'>
                    <h1>Accepted Reviews</h1>
                    <AcceptedReviews />
                </div>
                <div id='denied' className='requestTab' style={{ display: 'none' }}>
                    <h1>Denied Reviews</h1>
                    <DeniedReviews />
                </div>
                <div id='history' className='requestTab' style={{ display: 'none' }}>
                    <h1>Rate Reviews</h1>
                    <History />
                </div>
            </div>


        </div>
    )
}

export default SeekerPanel
