import React from 'react';
import './ResumeReviewEntry.scss'

const ResumeReviewEntry = ({
  entry,
  entry: { seeker, createdAt },
  submitResponse,
  updateResumeReview,
  refetch
}) => {

  console.log(`ResumeReviewEntry / submitResponse`, submitResponse)
  console.log(`ResumeReviewEntry / entry`, entry)

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
      }
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
      <div className="reviewer-jobs-list">
        <div className="reviewer-jobs-card">
          <p>{createdAt}</p>
          <p>{seeker.first_name} {seeker.last_name}</p>
          <p>{seeker.email}</p>
          {entry.status === 'Pending' &&
            <div >
              <button className='default-btn'
              onClick={handleAccept}>Accept</button>
          <button className='default-btn' onClick={handleDecline}>Decline</button>
            </div>
          }
          {entry.status === 'In Progress' &&
            <div>
              <button className='default-btn' onClick={handleUpdate}>Mark Completed</button>
            </div>

          }
          {entry.status === 'Completed' && 
            <div>
              <p>Completed at {entry.dateCompleted}</p>
              </div>}

        </div>
      </div>
    </div>
  );
};

export default ResumeReviewEntry;
