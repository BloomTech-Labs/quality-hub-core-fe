import React from 'react';
import './Rating.scss';
const Rating = ({ handleHover, hoverIdx, fields, index, handleClick }) => {
  return (
    <div 
      onClick={(e) => handleClick(e, index)} 
      onMouseOver={(e) => handleHover(e, index)}
      onMouseLeave={(e) => handleHover(e, fields.rating)}
      className={`rating-object ${( hoverIdx >= index ? 'gold' : '')}`}

    />
  )
}

export default Rating;