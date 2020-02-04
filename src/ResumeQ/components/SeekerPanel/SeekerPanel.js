import React from 'react'

import AcceptedReviews from './subs/AcceptedReviews';
import DeniedReviews from './subs/DeniedReviews';
import History from './subs/History';

import './SeekerPanel.scss'



const SeekerPanel = () => {

    function openTab(tab, btn) {
        let tabs = document.getElementsByClassName('requestTab');
        let btns = document.getElementsByClassName('SeekerQNav-btn');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = 'none';
            btns[i].style.textDecoration = 'none'
        }
        document.getElementById(tab).style.display = 'block';
        document.getElementById(btn).style.textDecoration = 'underline';
    }

    return (
        <div className="seeker-panel-container">
            <div className="seeker-panel-list">

                <div className='SeekerQNav-row'>
                    <button onClick={() => openTab('accepted', 'acceptedBtn')} id='acceptedBtn' className='SeekerQNav-btn' style={{textDecoration: 'underline'}}>Accepted</button>
                    <button onClick={() => openTab('denied', 'deniedBtn')} id='deniedBtn' className='SeekerQNav-btn'>Denied</button>
                    <button onClick={() => openTab('history', 'historyBtn')} id='historyBtn' className='SeekerQNav-btn'>History</button>
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
