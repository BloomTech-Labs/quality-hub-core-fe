import React from 'react';
import * as moment from 'moment';
import '../ReviewJobsCard.scss'

import ReviewGiven from '../../../../../global/components/ReviewGiven'

const ResumeReviewEntry = ({
  entry,
  status,
  submitResponse,
  updateResumeReview,
}) => {
  const format = 'MMM Do YYYY';


  const { seeker, createdAt, review } = entry


  console.log(`status status `, status)
  console.log(`entry entry `, entry)

  const handleAccept = e => {
    e.preventDefault()

    submitResponse({
      variables: {
        id: entry.id,
        isAccepted: true,
        isPending: false,
        isDenied: false
      }
    })

  }


  const handleDecline = e => {
    e.preventDefault()

    submitResponse({
      variables: {
        id: entry.id,
        isAccepted: false,
        isPending: false,
        isDenied: true
      },
    })

  }


  const handleUpdate = e => {
    e.preventDefault();

    updateResumeReview({
      variables: {
        id: entry.id,
        isComplete: true
      }
    })

  }

  return (
    <div>
      <div >
        <details className="reviewer-jobs-card">

          <summary className="reviewer-info">
            <div className="name-container">
              <h1>{seeker.first_name} {seeker.last_name}</h1>
            </div>
            <p>{seeker.email}</p>
            <p><b>Requested on</b> {moment(createdAt).format(format)}</p>
            {status === 'Pending' &&

              <div className="reviewer-btn-container">
                <button className='acc-reviewer-btn' onClick={handleAccept}>Accept</button>
                <button className='dec-reviewer-btn' onClick={handleDecline}>Decline</button>
              </div>
            }
            {status === 'In Progress' &&
              (<div className="reviewer-card-footer">
                <button className='com-reviewer-btn' onClick={handleUpdate}>Mark Completed</button>
              </div>)

            }
            {entry.status === 'Declined' &&
              (<div className="reviewer-card-footer">
                <h2>Declined</h2>
              </div>)}

            {entry.status === 'Completed' &&
              (<div className='completed-review-card'></div>)
            }

          </summary >

          {
            entry.status === 'Completed' &&
            (<div className="review-given-container">
              <p>Completed on {moment(entry.dateCompleted).format(format)}</p>
              {review && (<ReviewGiven review={review} />)}
            </div>)
          }

        </details >
      </div >
    </div >
  );
};

export default ResumeReviewEntry;
