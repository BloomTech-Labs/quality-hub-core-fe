import React from 'react';

const ResumeReviewEntry = ({
  request,
  request: { seeker, createdAt },
  submitResponse
}) => {

  console.log(`ResumeReviewEntry / submitResponse`, submitResponse)

  const handleAccept = e => {
    e.preventDefault()

    submitResponse({
      variables: {
        id: request.id,
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
        id: request.id,
        isAccepted: false,
        isPending: false,
      }
    })
  }


  return (
    <div>
      <div>
        <p>{createdAt}</p>
        <p>{seeker.first_name} {seeker.last_name}</p>
        <p>{seeker.email}</p>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default ResumeReviewEntry;
