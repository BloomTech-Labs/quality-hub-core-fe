// Libraries
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import BecomeCoach from '../../../../BecomeCoachResumeQ/BecomeCoachResumeQ'

// Styles
import './MarketplacePanels.scss';

// Icons
import Icon from '../../../../../../global/icons/Icon'
import { ICONS } from '../../../../../../global/icons/iconConstants'
// import { buildExecutionContext } from 'graphql/execution/execute';
import ListingForm from '../../../../ListingForm';
import UpdateListingForm from '../../../../UpdateListingForm';

export const MarketplacePanels = () => {
    
    const { pathname } = useLocation()

    return (

    <div className="RQNav">

        <NavLink to='/resumeq/marketplace'>
            <div className='RQNav-row'>
                <Icon
                    icon={ICONS.STAR}
                    width={24}
                    height={22}
                    color={pathname.includes('/resumeq') ? '#FB2046' : '#FB2046'}
                />
                <div className='RQNav-btn'>
                    <ListingForm />
                </div>
            </div>
        </NavLink>
     
            
        <NavLink to='/resumeq/marketplace'>
            <div className='RQNav-row'>
                <Icon
                    icon={ICONS.STAR}
                    width={24}
                    height={22}
                    color={pathname.includes('/resumeq') ? '#FB2046' : '#FB2046'}
                />
                <div className='RQNav-btn'>
                    <UpdateListingForm />
                </div>
            </div>
        </NavLink>
     
        <NavLink to='/resumeq/marketplace' strict activeClassName='RQNav-row-highlight'>
            <div className='RQNav-row'>
                <Icon
                    icon={ICONS.STAR}
                    width={24}
                    height={22}
                    color={pathname.includes('/resumeq/marketplace') ? 'white' : '#FB2046'}
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
                    color={pathname.includes('resumeq/seekerpanel') ? 'white' : '#FB2046'}
                />
                <div className='RQNav-btn'>Seeker Panel</div>
            </div>
        </NavLink>

        <NavLink to='/resumeq/reviewerjobs' exact activeClassName='RQNav-row-highlight'>
            <div className='RQNav-row'>
                <Icon
                    icon={ICONS.STAR}
                    width={24}
                    height={22}
                    color={pathname.includes('resumeq/reviewerjobs') ? 'white' : '#FB2046'}
                />
                <div className='RQNav-btn'>Reviewer Jobs</div>
            </div>
        </NavLink>

    </div>

    )
}