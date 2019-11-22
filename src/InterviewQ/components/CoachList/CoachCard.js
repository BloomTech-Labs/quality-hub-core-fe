import React from 'react';
import './CoachCard.scss'
import { tag } from 'postcss-selector-parser';

const CoachCard = ({post}) => {
  let { coach } = post;
    return(
        <div className="coach-card">
            <div className="coach-photo">
                <img src="https://www.birdorable.com/img/bird/th440/california-quail.png" />
            </div>
            <div className="coach-text">
              <div className="flex-sect">
                <div className="left-side">
                    <h3>{coach.first_name} {coach.last_name}</h3>
                    <h4>{post.position} {coach.city}, {coach.state}</h4>
                    <p>{post.description}</p>
                    <p>{post.industry.name}</p>
                </div>
                <div className="right-side">
                    <h4><span>&#x2605; 4.9</span>   ${post.price} / hour</h4>
                </div>
              </div>
              <div className="footer">
                <p>Links go here</p>
                <div>
                  {post.tags.map(tag => <p>{tag.name}</p>)
                  }
                </div>
                <button className="interview-button" disabled>Request Interview</button>
              </div>
            </div>
        </div>
    )
}

export default CoachCard;