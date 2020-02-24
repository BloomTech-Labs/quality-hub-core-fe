import React, { useState } from "react";

// Components
import Rating from './CoachRating_Stars';

export const RatingCategory = props => {
  // state
  const [hoverIdx, setHover] = useState();

  // var declaration
  const messages = [
    '',
    'Action required',
    'Needs improvement',
    'Not bad.',
    'Solid!',
    'Super Great!'
  ];
  const stars = [];

  // methods
  // this method tracks which star is being hovered over
  const handleHover = (e, index) => {
    setHover(index);
  }

  // creates 5 stars that a user can select for grading
  for (let i = 0; i < 5; i++) {
    stars.push(<Rating key={i} hoverIdx={hoverIdx} handleHover={handleHover} handleClick={props.handleClick} index={i + 1} fields={props.fields} name={props.category.camel} />)
  }

  return (
    <div className="rating-category">
      <p className="rating-label">{props.category.string}</p>
      <div className="rating-container">
        <div className='stars-container'>
          {stars}
        </div>
        <p className="message">{messages[hoverIdx]}</p>
      </div>

      <div className="review-text">
        <label className='coachreport-label'>
          Additional Feedback (optional)
        </label>
        <textarea
          className='review-text-area'
          name={props.category.camel}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
};

export default RatingCategory;
