import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Components
import { RatingCategory } from './RatingCategory';
// Dummy Data ************ DELETE LATER (after back-end is functioning properly) ************
import { categories } from '../../../data/dummyData';

import { CREATE_REVIEW_FOR_COACH_TO_USE, GET_SEEKER_BOOKINGS } from '../../Review/Resolvers';
import Rating from './CoachRating_Stars';
import '../../Review/subs/ReviewForm.scss';

// This component renders a rubric for the coach to fill out about the seeker they interviewed
const CoachReviewForm = props => {

  // *** Replace this GraphQL code with dummy data code
  const [submitReview, { called, loading, error }] = useMutation(CREATE_REVIEW_FOR_COACH_TO_USE, {
    update(cache, {data: { createReview }}) {
      const data = cache.readQuery({query: GET_SEEKER_BOOKINGS, variables: {seeker_id: localStorage.getItem('id')}})
      const bookings = data.bookingsBySeeker;
      const id = props.id
      const newBookings = bookings.map(booking => {
        if (booking.uniquecheck === id) {
          return {...booking, review: createReview}
        }
        return booking
      })
      console.log(newBookings);
      cache.writeQuery({query: GET_SEEKER_BOOKINGS, data: {...data, bookingsBySeeker: newBookings}})
    }
  });
  // ***

  const [fieldsError, setError] = useState({errorMessage: ""});
  // const [hoverIdx, setHover] = useState();
  const [fields, setFields] = useState({
    firstImpression_comment: "",
    firstImpression_rating: null,
    resume_comment: "",
    resume_rating: null,
    professionalism_comment: "",
    professionalism_rating: null,
    generalAttitude_comment: "",
    generalAttitude_rating: null,
    technicalProficiency_comment: "",
    technicalProficiency_rating: null,
    contentOfAnswers_comment: "",
    contentOfAnswers_rating: null,
    communication_comment: "",
    communication_rating: null
  });

  // const handleHover = (e, index) => {
  //   setHover(index);
  // }

  const handleChange = e => {
    e.preventDefault();
    setFields({...fields, [`${e.target.name}_comment`]: e.target.value})
    console.log(fields);
  }

  const handleClick = (e, index, name) => {
    e.preventDefault();
    setFields({...fields, [`${name}_rating`]: index });
    // setFields({...fields, rating: index });
    // setHover(index);
  }

  // *** DO NOT DELETE This needs to be adjusted when the back end is functioning ***
  const handleSubmit = e => {
    e.preventDefault();
    let canItHappen = true;
    let id = props.id;

    //run through all keys with the term "rating" to ensure they have values
    for(let key in fields) {
      if(key.toString().includes('rating')) {
        //assign either a true or false value to a check variable each iteration of the for loop
        canItHappen = checkError(fields[key]);
      }
      //if the value is ever made falsey, break the loop and continue to the submit review
      if(!canItHappen) {
        break;
      }
    }

    //only submit the review if the check variable stayed true through the entire loop
    canItHappen && submitReview({variables: { review: fields.review, rating: Number(fields.rating), uniqueBooking: id}});
  }
  // *** ***

  const checkError = (rating) => {
    if (!rating) {
      setError({...fieldsError, errorMessage: "Rating must be at least one star"})
      return false
    } else {
      setError({...fieldsError, errorMessage: ""})
      return true
    }
  }

  useEffect(() => {
    console.log("loading",loading);
    if (called && !loading && !error) {
      props.setOpen(true);
    }
  }, [called, loading])

	return (
		<form className='review-form'>
      <div className='review-container'>
        <div className='rating-form'>
          {categories.map(category => (
            <RatingCategory category={category} handleChange={handleChange} handleClick={handleClick} fields={fields} />
          ))}
        </div>

      </div>
      {fieldsError.errorMessage &&
        <div className='submit-review-error-message'>
          <p>{fieldsError.errorMessage}</p>
        </div>
      }
      <div className='button-container'>
        <Link to ='/interviewq/history' className='review-button button cancel'>Cancel</Link>
        <p className='review-button button submit' onClick={handleSubmit}>Submit</p>
      </div>
		</form>
	);
};

export default CoachReviewForm;
