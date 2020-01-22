import React from 'react';
import '../ReviewJobsCard.scss'

const ResumeReviewEntry = ({
  entry,
  entry: { seeker, createdAt },
  submitResponse,
  updateResumeReview,
  status
}) => {

  // console.log(`ResumeReviewEntry / submitResponse`, submitResponse)
  // console.log(`ResumeReviewEntry / entry`, entry)
  // console.log(`ResumeReviewEntry / status`, status)

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
          <p>{createdAt}</p>
          <p>{seeker.first_name} {seeker.last_name}</p>
          <p>{seeker.email}</p>
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
              <p>Completed at {entry.dateCompleted}</p>
            </div>}

        </div>
      </div>
    </div>
  );
};

export default ResumeReviewEntry;
