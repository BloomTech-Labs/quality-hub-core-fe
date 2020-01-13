import React from 'react';

const ResumeReviewEntry = ({
  request,
  request: { coach, seeker, createdAt }
}) => {

  return (
    <div>
      <div>
        <p>{createdAt}</p>
        <p>{seeker.first_name} {seeker.last_name}</p>
        <p>{seeker.email}</p>
        <button>Accept</button>
        <button>Decline</button>
      </div>
    </div>
  );
};

export default ResumeReviewEntry;
