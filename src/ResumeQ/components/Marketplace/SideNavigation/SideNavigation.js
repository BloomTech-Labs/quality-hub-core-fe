// Libraries
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'

// Local Imports
import ListingForm from '../../ListingForm';
import UpdateListingForm from '../../UpdateListingForm'

// Styles
import './SideNavigation.scss'

// Icons
import Icon from '../../../../global/icons/Icon'
import { ICONS } from '../../../../global/icons/iconConstants'

import { GET_USER } from '../Resolvers';

const SideNavigation = () => {
  const { pathname } = useLocation()
  // state to control display of links to edit reviewer listing
  const [hasListing, setHasListing] = useState();
  const [isSeeker, setIsSeeker] = useState();
  const [isReviewer, setIsReviewer] = useState();

  const [getUser, { refetch, loading, data: userData }] = useLazyQuery(
    GET_USER,
  );

  useEffect(() => {
    //only check for current user if there is a token
    if (localStorage.getItem('token')) {
      getUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userData) {
      setHasListing(userData.me.reviewerListing);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      setIsSeeker(userData.me.seeker_resume_reviews)
    }
  }, [userData])

  useEffect(() => {
    if (userData) {
      setIsReviewer(userData.me.coach_resume_reviews)
    }
  }, [userData])

  console.log(`SideNavigation / userData`, userData)
  console.log(`SideNavigation / hasListing`, hasListing)
  console.log(`SideNavigation / isSeeker`, isSeeker)
  console.log(`SideNavigation / isReviewer`, isReviewer)



  return (

    <div className='RQNav'>
      <h1>h1h1</h1>

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
              <UpdateListingForm />
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
      )}

    </div>


    // Become a Coach
    // ---display when user is not logged in
    // ---display iff user doesn't have lising


    // Edit Listing 
    // ---display iff user has listing

    // MarketPlace
    // ---display always

    // Seeker Panel
    // ---display iff user has ResumeReviews

    // ReviewerJobs
    // ---display iff user has listing

    // <div>
    //   <h1>SideNavigation</h1>
    //   {localStorage.getItem('token') ? (
    //     //if user data is done loading...
    //     !loading ? (
    //       hasListing ? (
    //         //if you have a post made, show edit
    //         <Link
    //           to='/resumeq/settings'
    //           className='become-a-coach-reroute-to-signin'>
    //           <button className='become-a-coach-btn'>
    //             <span className='add-coach-form-button'>Edit Listing</span>
    //           </button>
    //         </Link>
    //       ) : (
    //           //if no post made, allow to create a post
    //           <ListingForm refetch={refetch} />
    //         )
    //     ) : //while checking if user has a post, leave button off page
    //       null
    //   ) : (
    //       //if no token link to signin
    //       <Link to='/resumeq' className='become-a-coach-reroute-to-signin'>
    //         <button className='become-a-coach-btn'>
    //           <span className='add-coach-form-button'>Create a listing</span>
    //         </button>
    //       </Link>
    //     )

    //   }

    //   <div className="RQNav">
    //     {isSeeker && (<NavLink to='/resumeq/seekerpanel' activeClassName='RQNav-row-highlight'>
    //       <div className='RQNav-row'>
    //         <Icon
    //           icon={ICONS.STAR}
    //           width={24}
    //           height={21}
    //           color={pathname.includes('star') ? 'white' : '#096dd9'}
    //         />
    //         <div className='RQNav-btn'>Seeker Panel</div>
    //       </div>
    //     </NavLink>)}

    //     {isReviewer && (<NavLink to='/resumeq/reviewerjobs' activeClassName='RQNav-row-highlight'>
    //       <div className='RQNav-row'>
    //         <Icon
    //           icon={ICONS.STAR}
    //           width={24}
    //           height={22}
    //           color={pathname.includes('star') ? 'white' : '#096dd9'}
    //         />
    //         <div className='RQNav-btn'>Reviewer Jobs</div>
    //       </div>
    //     </NavLink>)}
    //   </div>
    // </div>
  )
}

export default SideNavigation
