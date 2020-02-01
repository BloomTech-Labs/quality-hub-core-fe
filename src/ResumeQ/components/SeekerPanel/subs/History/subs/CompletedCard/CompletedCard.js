import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as moment from 'moment';
import { Route } from 'react-router-dom'

import { ICONS } from '../../../../../../../global/icons/iconConstants'
import Icon from '../../../../../../../global/icons/Icon'

import Review from '../../../../../../../Core/components/Review/'

const CompletedCard = ({ review }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { id, coach, seeker } = review;
  const job = {
    id,
    coach,
    seeker
  }

  const openModal = e => {
    e.preventDefault();
    setModalOpen(!modalOpen)
  }

  console.log(`CompletedCard // job`, job)

  const format = 'MMM Do YYYY';

  // TODO refactor to display data from ResumeReview
  return (
    <div className="seeker-card" key={review.id}>
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
        <p><b>Created on </b>{moment(review.createdAt).format(format)}</p>
        <div className="v1"></div>
        <span className="dot1"></span><p className="acc-text"> <b className="green">Accepted on</b> {moment(review.dateAccepted).format(format)}</p>
      </div>

      {/* <Route path='/resumeq/seekerpanel/review' /> */}

      {/* // TODO onclick to launch modal, default to closed */}
      <button className='review-button button cancel' onClick={openModal}>Leave a Review</button>
      <div>
        {modalOpen && <div>
          {ReactDOM.createPortal(
            <Review job={job} modalOpen={modalOpen} setModalOpen={setModalOpen} />
          )}
        </div>}


      </div>
    </div>
  )
}

export default CompletedCard;
