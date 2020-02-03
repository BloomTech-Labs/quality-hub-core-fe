import React from 'react';
import * as moment from 'moment';
import '../ReviewJobsCard.scss'

const ResumeReviewEntry = ({
  entry,
  submitResponse,
  updateResumeReview,
}) => {

const { seeker, createdAt, review, status } = entry;

  console.log(`ResumeReviewEntry / submitResponse`, submitResponse)
  console.log(`ResumeReviewEntry / entry`, entry)
  console.log(`ResumeReviewEntry / status`, status)

  var format = 'MMM Do YYYY';

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
        <div className="reviewer-jobs-card">

        <div className="reviewer-info">
          <h1>{seeker.first_name} {seeker.last_name}</h1>
          <p>{seeker.email}</p>
          <p><b>Requested on</b> {moment(createdAt).format(format)}</p>
        </div>

          

          {status === 'Pending' &&
            <div className="reviewer-btn-container">
              <button className='acc-reviewer-btn' onClick={handleAccept}>Accept</button>
              <button className='dec-reviewer-btn' onClick={handleDecline}>Decline</button>
            </div>
          }
          {status === 'In Progress' &&
            <div className="reviewer-card-footer">
              <button className='com-reviewer-btn' onClick={handleUpdate}>Mark Completed</button>
            </div>

          }
          {status === 'Completed' &&
            <div>
              <p>Completed on {moment(entry.dateCompleted).format(format)}</p>
            </div>}

        </div>
      </div>
    </div>
  );
};

export default ResumeReviewEntry;
