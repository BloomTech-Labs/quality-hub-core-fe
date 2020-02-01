import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { CREATE_REVIEW, GET_SEEKER_BOOKINGS, REVIEW_BY_JOB_ID } from '../Resolvers';
import Rating from './2_Rating';
import './RQReviewForm.scss';

// TODO move comments to global component
// TODO state that describes the service this review is being left on (ie ResumeQ or InterviewQ) service_id
// TODO state that holds the booking_id or ResumeReview_id >> job_id

const ReviewForm = (props) => {

  console.log('1_ReviewForm // props', props)
  // console.log(`1_ReviewForm // state`, state)

  // * re-factor mutation to create entry in Core
  const [submitReview, { called, loading, error }] = useMutation(CREATE_REVIEW, {
    update(cache, { data: { createReview } }) {
      // const data = cache.readQuery({ query: GET_SEEKER_BOOKINGS, variables: { seeker_id: localStorage.getItem('id') } })
      // const bookings = data.bookingsBySeeker;
      // const id = props.id

      // ! unsure what the below code accomplishes
      // const newBookings = bookings.map(booking => {
      //   if (booking.uniquecheck === id) {
      //     return { ...booking, review: createReview }
      //   }
      //   return booking
      // })
      // console.log(newBookings);
      // cache.writeQuery({ query: GET_SEEKER_BOOKINGS, data: { ...data, bookingsBySeeker: newBookings } })
    }
  });


  // * fields state controls the star rating and comment left by a reviewer
  const [fields, setFields] = useState({ rating: 0, review: "" })
  // * fields error handles errors due to required feedback (star rating) not being provided by the user
  const [fieldsError, setError] = useState({ rating: "" })
  // * hoverIdx is associated with a star -- each star has a number value which, when hovered over, triggers the message at that index
  const [hoverIdx, setHover] = useState();

  const messages = [
    '',
    'Never again!',
    'Meh.',
    'Not bad.',
    'Solid!',
    'Super great!'
  ]

  // assigns an index to the value of the star currently hovered
  const handleHover = (e, index) => {
    setHover(index);
  }

  // * assigns field state from form input
  const handleChange = e => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value })
  }
  // * assigns field.rating based on which star is clicked
  const handleClick = (e, index) => {
    setFields({ ...fields, rating: index })
    setHover(index);
    checkError(index);
  }

  // * handleSubmit executes submitReview mutation with fields
  const handleSubmit = e => {
    e.preventDefault();
    let id = props.id;
    if (checkError(fields.rating)) {
      submitReview({
        variables: {
          input: {
            ...props.location.state,
            rating: Number(fields.rating),
            review: fields.review
          }
        }
      });
    }
    props.history.push('/resumeq/seekerpanel');
  }

  // * checks that user has at least given a star rating
  const checkError = (rating) => {
    if (!rating) {
      setError({ ...fieldsError, rating: "Rating must be at least one star" })
      return false
    } else {
      setError({ ...fieldsError, rating: "" })
      return true
    }
  }

  let stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(<Rating key={i} hoverIdx={hoverIdx} handleHover={handleHover} handleClick={handleClick} index={i + 1} fields={fields} />)
  }

  // * changes parent component's 'open' state which controls the modal state
  useEffect(() => {
    console.log(loading);
    if (called && !loading && !error) {
      props.setOpen(true);
    }
  }, [called, loading])

  return (
    <form className='RQreview-form'>
      <div className='RQreview-container'>
        <div className='RQrating-form'>
          {console.log('props in reviewForm', props)}
          <p className='RQlabel'>How did  do? </p>
          {fieldsError.rating && <p>{fieldsError.rating}</p>}
          <div className='RQrating-container'>
            <div className={`RQstars-container ${fieldsError.rating ? 'error' : ''}`}>
              {stars}
            </div>
            <p className='RQmessage'>{messages[hoverIdx]}</p>
          </div>
        </div>
        <div className='RQreview-text'>
          <p className='RQlabel'>Any feedback you want to share?</p>
          <textarea onChange={handleChange} className='RQreview-text-area' name='review' placeholder='I thought the interview was...' value={fields.review} />
        </div>
      </div>
      <div className='RQbutton-container'>
        <Link to='/resumeq/seekerpanel' className='RQreview-button button cancel'>Cancel</Link>
        <p className='RQreview-button button submit' onClick={handleSubmit}>Submit</p>
      </div>
    </form>
  );
};

export default ReviewForm;
