import React from 'react';

import './SampleCard.scss';

const SampleCard = () => {
  return (
    <div className="sample-card">
      <div className="coach-photo">
          <img src="https://www.birdorable.com/img/bird/th440/california-quail.png" />
      </div>
      <div className="coach-text">
          <div className="coach-card-top">
              <div className="coach-card-top-left">
          <h3>Coach Name</h3>
          <h4>Coach Title</h4>
          </div>
          <div className="coach-card-top-right">
              <h4><span>&#x2605; 4.9</span>     $60 / hour</h4>
              <h4>Sunnyvale, CA</h4>
          </div>
          </div>
          <div className="coach-card-bottom">
            <p>Lorem quailum birdor sit covey, flight adipiscing quailit. Vitae dictum  covey quaility amet, sollicitudin quailcu. Lorem quailum birdor sit covey, flight adipiscing quailit. Vitae dictum  covey quaility amet, sollicitudin quailcu. </p>
            <button disabled>Request Interview</button>
          </div>
          <p>Links go here</p>
      </div>
    </div>
  )
}

export default SampleCard;