import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW } from './Resolvers.js';
import Rating from './Rating';
import './CoachReview.scss';

const CoachReview = props => {
  const [fields, setFields] = useState({rating: 0, review: ""})
  const [fieldsError, setError] = useState({rating: "", review: ""})
  useEffect(() => {
    
  })
  const [submitReview, { called, error }] = useMutation(CREATE_REVIEW);

  useEffect(() => {
    if (called && !error) {
      props.history.goBack();
    }
  }, [called])

  const handleChange = e => {
    e.preventDefault();
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    let id = props.match.params.id
    submitReview({variables: { review: fields.review, rating: Number(fields.rating), uniqueBooking: id}})
  }

	return (
		<form onChange={handleChange} onSubmit={handleSubmit}>
      <div>
        <label>Rating </label>
        <Rating />
        <input name='rating' type="number" value={fields.rating} />
      </div>
      <div>
        <label>Review </label>
			  <input name='review' placeholder='comment review here' value={fields.review}/>
      </div>
      <button>Submit</button>
		</form>
	);
};

export default CoachReview;
