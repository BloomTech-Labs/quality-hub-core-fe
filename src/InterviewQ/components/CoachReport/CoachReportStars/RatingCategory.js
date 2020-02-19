import React, { useState } from "react";

// Components
import Rating from './CoachRating_Stars';

export const RatingCategory = props => {
  // state
  const [fieldsError, setError] = useState({rating: ""});
  const [hoverIdx, setHover] = useState();

  // var declaration
  const messages = [
    '',
    'Never again!',
    'Meh.',
    'Not bad.',
    'Solid!',
    'Super great!'
  ];
  const stars = [];

  // methods
  const checkError = (rating) => {
    if (!rating) {
      setError({...fieldsError, rating: "Rating must be at least one star"})
      return false
    } else {
      setError({...fieldsError, rating: ""})
      return true
    }
  }

  const handleHover = (e, index) => {
    setHover(index);
  }

  // const handleClick = (e, index) => {
  //   setFields({...fields, rating: index })
  //   setHover(index);
  //   checkError(index);
  // }

  // const handleChange = e => {
  //   e.preventDefault();
  //   setFields({...fields, [e.target.name]: e.target.value})
  // }

  // stars
  for (let i = 0; i < 5; i++) {
    stars.push(<Rating key={i} hoverIdx={hoverIdx} handleHover={handleHover} handleClick={props.handleClick} index={i + 1} fields={props.fields} name={props.category.camel} />)
  }

  return (
    <div className="rating-category">
      <p className="rating-label">{props.category.string}</p>
      {fieldsError.rating && <p>{fieldsError.rating}</p>}
      <div className="rating-container">
        <div className={`stars-container ${fieldsError.rating ? "error" : ""}`}>
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
