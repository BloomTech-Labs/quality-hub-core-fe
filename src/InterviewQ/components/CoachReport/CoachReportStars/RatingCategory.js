import React, { useState } from "react";

// Components
import Rating from './CoachRating_Stars';

export const RatingCategory = props => {
  // state
  const [fieldsError, setError] = useState({rating: ""});
  const [hoverIdx, setHover] = useState();
  const [fields, setFields] = useState({rating: 0, review: ""})

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

  const handleClick = (e, index) => {
    setFields({...fields, rating: index })
    setHover(index);
    checkError(index);
  }

  for (let i = 0; i < 5; i++) {
    stars.push(<Rating key={i} hoverIdx={hoverIdx} handleHover={handleHover} handleClick={handleClick} index={i + 1} fields={fields} />)
  }

  return (
    <div>
      <p className="label">{props.category}</p>
      {fieldsError.rating && <p>{fieldsError.rating}</p>}
      <div className="rating-container">
        <div className={`stars-container ${fieldsError.rating ? "error" : ""}`}>
          {stars}
        </div>
        <p className="message">{messages[hoverIdx]}</p>
      </div>
    </div>
  );
};

export default RatingCategory;
