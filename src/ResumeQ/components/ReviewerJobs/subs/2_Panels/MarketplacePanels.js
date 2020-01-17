// Libraries
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'

// Styles
import './MarketplacePanels.scss';

// Icons
import Icon from '../../../../../../global/icons/Icon'
import { ICONS } from '../../../../../../global/icons/iconConstants'

export const MarketplacePanels = () => {
    
    const { pathname } = useLocation()

    return (

        <div className="RQNav">
        <NavLink to='/resumeq/seekerpanel' activeClassName='RQNav-row-highlight'>
            <div className='RQNav-row'>
                <Icon
                    icon={ICONS.STAR}
                    width={24}
                    height={21}
                    color={pathname.includes('star') ? 'white' : '#096dd9'}
                />
                <div className='RQNav-btn'>Seeker Panel</div>
            </div>
        </NavLink>

        <NavLink to='/resumeq/reviewerjobs' activeClassName='RQNav-row-highlight'>
            <div className='RQNav-row'>
                <Icon
                    icon={ICONS.STAR}
                    width={24}
                    height={22}
                    color={pathname.includes('star') ? 'white' : '#096dd9'}
                />
                <div className='RQNav-btn'>Reviewer Jobs</div>
            </div>
        </NavLink>
    </div>

    )
}