import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useParams, useHistory } from "react-router-dom";

// Components
import { RatingCategory } from "./RatingCategory";
import useModal from "../../../../global/utils/useModal";
import FeedbackModal from "../../CoachReport/FeedbackModal/FeedbackModal";

// Dummy Data ************ DELETE LATER (after back-end is functioning properly) ************
import { categories } from "../../../data/dummyData";

// GraphQL
import {
  CREATE_REVIEW_FOR_COACH_TO_USE,
  GET_SEEKER_BOOKINGS
} from "../../Review/Resolvers";

// Styling
import "../../Review/subs/ReviewForm.scss";
import "../CoachReport.scss";

// This component renders a rubric for the coach to fill out about the seeker they interviewed
const CoachReviewForm = props => {
  const { key } = useParams();
  const history = useHistory();
  const { isShowing, toggle } = useModal();

  // *** Replace this GraphQL code with dummy data code
  // const [submitReview, { called, loading, error }] = useMutation(
  //   CREATE_REVIEW_FOR_COACH_TO_USE,
  //   {
  //     update(cache, { data: { createReview } }) {
  //       const data = cache.readQuery({
  //         query: GET_SEEKER_BOOKINGS,
  //         variables: { seeker_id: localStorage.getItem("id") }
  //       });
  //       const bookings = data.bookingsBySeeker;
  //       const id = props.match.params.key;
  //       const newBookings = bookings.map(booking => {
  //         if (booking.uniquecheck === id) {
  //           return { ...booking, review: createReview };
  //         }
  //         return booking;
  //       });
  //       console.log(newBookings);
  //       cache.writeQuery({
  //         query: GET_SEEKER_BOOKINGS,
  //         data: { ...data, bookingsBySeeker: newBookings }
  //       });
  //     }
  //   }
  // );
  // ***
  const [submitReview, error] = useMutation(CREATE_REVIEW_FOR_COACH_TO_USE);

  // state
  const [fieldsError, setError] = useState({ errorMessage: "" });
  const [fields, setFields] = useState({
    firstImpression_rating: null,
    resume_rating: null,
    professionalism_rating: null,
    generalAttitude_rating: null,
    technicalProficiency_rating: null,
    contentOfAnswers_rating: null,
    communication_rating: null,
    firstImpression_comment: "",
    resume_comment: "",
    professionalism_comment: "",
    generalAttitude_comment: "",
    technicalProficiency_comment: "",
    contentOfAnswers_comment: "",
    communication_comment: ""
  });

  const handleChange = e => {
    e.preventDefault();
    setFields({ ...fields, [`${e.target.name}_comment`]: e.target.value });
  };

  const handleClick = (e, index, name) => {
    e.preventDefault();
    setFields({ ...fields, [`${name}_rating`]: index });
  };

  // *** DO NOT DELETE, This needs to be adjusted when the back end is functioning ***
  const handleSubmit = e => {
    e.preventDefault();
    let canItHappen = true;
    let id = props.match.params.key;

    // run through all keys with the term "rating" to ensure they have values
    for (let key in fields) {
      if (key.toString().includes("rating")) {
        // assign either a true or false value to a check variable each iteration of the for loop
        canItHappen = checkError(fields[key]);
      }
      // if the value is ever made falsey, break the loop and continue to the submit review
      if (!canItHappen) {
        break;
      }
    }

    const report = { uniqueBooking: id, ...fields };
    console.log(report);

    // only submit the review if the check variable stayed true through the entire loop
    canItHappen &&
      submitReview({ variables: report })
        .then(results => {
          console.log(results);

          // toggles modal pop-up upon clicking Submit button
          toggle();
        })
        .catch(err => {
          console.log("ERROR:", err);
        });
  };
  // *** ***

  const checkError = rating => {
    if (!rating) {
      setError({
        ...fieldsError,
        errorMessage: "Rating must be at least one star"
      });
      return false;
    } else {
      setError({ ...fieldsError, errorMessage: "" });
      return true;
    }
  };

  // useEffect(() => {
  //   console.log("coach rating form loading", loading);
  //   if (called && !loading && !error) {
  //     props.setOpen(true);
  //   }
  // }, [called, loading]);

  return (
    <form className="review-form coachreport-wrapper">
      <div className="review-container">
        <div className="rating-form">
          {categories.map(category => (
            <RatingCategory
              category={category}
              handleChange={handleChange}
              handleClick={handleClick}
              fields={fields}
            />
          ))}
        </div>
      </div>
      {fieldsError.errorMessage && (
        <div className="submit-review-error-message">
          <p>{fieldsError.errorMessage}</p>
        </div>
      )}
      <div className="button-container">
        <Link to="/interviewq/history" className="review-button button cancel">
          Skip for now
        </Link>
        <p className="review-button button submit" onClick={handleSubmit}>
          Submit
        </p>
      </div>

      <FeedbackModal isShowing={isShowing} />
    </form>
  );
};

export default CoachReviewForm;
