// Libraries
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'

// Local Imports
import ListingForm from '../ListingForm';
import UpdateListingForm from '../UpdateListingForm'

// Styles
import './SideNavigation.scss'

// Icons
import Icon from '../../../global/icons/Icon'
import { ICONS } from '../../../global/icons/iconConstants'

import { GET_USER } from '../Marketplace/Resolvers';

const SideNavigation = () => {
  const { pathname } = useLocation()
  console.log(`SideNavigation // pathname`, pathname)
  // state to control display of links to edit reviewer listing
  const [hasListing, setHasListing] = useState(false);
  const [isSeeker, setIsSeeker] = useState(false);
  const [isReviewer, setIsReviewer] = useState(false);

  // TODO -- add 'has resumeQ listing query, and ResumeReviewRequests query -- simplifies exchange of data

  const [getUser, { refetch, loading, data: userData }] = useLazyQuery(
    GET_USER,
  );

  console.log(`SIDENAVIGATION // userData`, userData)

  useEffect(() => {
    //only check for current user if there is a token
    if (localStorage.getItem('token')) {
      getUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userData && userData.me.reviewerListing) {
      setHasListing(true);
    }
  }, [userData]);

  // displays Seeker Panel link if user has any ResumeReview entries as a seeker
  useEffect(() => {
    if (userData && userData.me.resume_reviews_as_seeker.length > 0) {
      setIsSeeker(true)
    }
  }, [userData])

  // displays ReviewrJobs link if user has any ResumeReview entries as a coach
  useEffect(() => {
    if (userData && userData.me.resume_reviews_as_coach.length > 0) {
      setIsReviewer(true)
    }
  }, [userData])



  return (

    <div className='RQNav'>
      {!hasListing && (
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
      )}

      {hasListing && (
        <NavLink to='/resumeq/marketplace'>
          <div className='RQNav-row'>
            <Icon
              icon={ICONS.STAR}
              width={24}
              height={22}
              color={pathname.includes('/resumeq') ? '#FB2046' : '#FB2046'}
            />
            <div className='RQNav-btn'>
              <UpdateListingForm user={userData.me} />
            </div>
          </div>
        </NavLink>
      )

      }

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

      {isSeeker && (
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
      )}

      {isReviewer && (
        <NavLink to='/resumeq/reviewerjobs' activeClassName='RQNav-row-highlight'>
          <div className='RQNav-row'>
            <Icon
              icon={ICONS.STAR}
              width={24}
              height={22}
              color={pathname.includes('reviewerjobs') ? 'white' : '#FB2046'}
            />
            <div className='RQNav-btn'>Reviewer Jobs</div>
          </div>
        </NavLink>
      )}

    </div>


  )
}

export default SideNavigation
