// Libraries
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import BecomeCoach from '../../../../BecomeCoachResumeQ/BecomeCoachResumeQ'

// Styles
import './MarketplacePanels.scss';

// Icons
import Icon from '../../../../../../global/icons/Icon'
import { ICONS } from '../../../../../../global/icons/iconConstants'
import { buildExecutionContext } from 'graphql/execution/execute';

export const MarketplacePanels = () => {
    
    const { pathname } = useLocation()

    return (



    <div className="RQNav">
            <div className='RQNav-row'>
                <BecomeCoach />
            </div>

    <NavLink to='/resumeq' exact activeClassName='RQNav-row-highlight'>
            <div className='RQNav-row'>
                <Icon
                    icon={ICONS.STAR}
                    width={24}
                    height={22}
                    color={pathname.includes('/resumeq') ? 'white' : '#096dd9'}
                />
                <div className='RQNav-btn'>Marketplace</div>
            </div>
        </NavLink>

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