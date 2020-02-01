import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { COMPLETED_REVIEWS_BY_SEEKER } from '../../Resolvers';
// import ReviewPage from '../../../../../Core/components/Review/ReviewPage'
import CompletedCard from './subs/CompletedCard'
import Loading from '../../../../../global/components/Loading'


//SVG
import ResumeQ2 from '../../../../../../src/global/icons/resumeQ2.svg'


const History = () => {

  // TODO add state for modal...?

  const { refetch, loading, data } = useQuery(COMPLETED_REVIEWS_BY_SEEKER, {
    fetchPolicy: 'network-only'
  })

  // console.log('RateReviews', data)

  return (
    <div>
      <h2>Rate Reviews Here!</h2>
      {!loading && (!data.completedResumeReviewsBySeeker[0] && (
        <div>
          <div className='resumeQ1'>
            <img src={ResumeQ2} alt='no completed reviews' />
            <p>You currently have no completed reviews...</p>
          </div>
        </div>
      ))}
      {loading && <Loading />}
      {!loading && data.completedResumeReviewsBySeeker[0] && (
        <div className="seeker-list">
          {data.completedResumeReviewsBySeeker.map(review =>
            <CompletedCard review={review} key={review.id} />
          )}
        </div >
      )}
    </div>
  )

}


export default History
