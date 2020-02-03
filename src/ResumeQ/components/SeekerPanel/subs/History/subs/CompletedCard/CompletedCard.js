import React, { useState } from 'react';
import * as moment from 'moment';

import { ICONS } from '../../../../../../../global/icons/iconConstants'
import Icon from '../../../../../../../global/icons/Icon'
import { Review } from '../../../../../../../Core/components/Review/Review'

import ReviewGiven from './subs/ReviewGiven'

// TODO import star display

const CompletedCard = ({ resumeReview, query }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { id, coach, seeker, review } = resumeReview;
  const job = {
    id,
    coach,
    seeker,
    microservice: 'RESUMEQ'
  }



  console.log(`CompletedCard // resumeReview`, resumeReview)
  console.log(`CompletedCard // job`, job)

  const format = 'MMM Do YYYY';

  // TODO refactor to display data from ResumeresumeReview
  return (

    <div className="seeker-card" key={resumeReview.id}>
      <div className="seeker-header-container">
        <div className="coach-photo">
          {coach.image_url ? (
            <img src={coach.image_url} alt='Coach Profile Pic' width="95" height="95" />
          ) : (
              <div className='blank-image'>
                <Icon
                  icon={ICONS.BLANK_AVATAR}
                  color='white'
                  width={90}
                  height={90}
                />
              </div>
            )}
        </div>
      </div>
      <div className='seeker-card-info'>
        <h1>{coach.first_name}{coach.last_name}</h1>
        <p>{coach.email}</p>
      </div>
      <div className="seeker-date">
        <p><b>Created on </b>{moment(resumeReview.createdAt).format(format)}</p>
        <div className="v1"></div>
        <span className="dot1"></span><p className="acc-text"> <b className="green">Accepted on</b> {moment(resumeReview.dateAccepted).format(format)}</p>
      </div>
      {review ? <ReviewGiven review={review} />
        :
        <button className='review-button button cancel' onClick={() => setModalOpen(!modalOpen)}>Leave a Review</button>
      }
      <div>
        {modalOpen && <Review job={job} modalOpen={modalOpen} setModalOpen={setModalOpen} query={query} />}
      </div>
    </div>

  )
}

export default CompletedCard;
