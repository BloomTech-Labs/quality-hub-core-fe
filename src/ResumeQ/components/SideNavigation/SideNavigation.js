// Libraries
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'

// Styles
import './SideNavigation.scss'

// Icons
import Icon from '../../../global/icons/Icon'
import { ICONS } from '../../../global/icons/iconConstants'

import { GET_USER } from './Resolvers';

const SideNavigation = () => {
  const { pathname } = useLocation()
  // state to control display of links to edit reviewer listing
  const [hasListing, setHasListing] = useState();

  const [getUser, { refetch, loading, data: userData }] = useLazyQuery(
    GET_USER,
  );


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

export default SideNavigation
