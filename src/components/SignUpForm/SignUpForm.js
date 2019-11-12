import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import GeneralSignUp from "./GeneralSignUp.js";
import ExpSignUp from "./ExpSignUp.js";
import CompletedSignUp from "./CompletedSignUp";
import * as yup from "yup";
import { string, object, mixed } from "yup";

//GraphQuail Stuff
const GET_INDUSTRIES = gql`
  query {
    industries {
      name
      id
    }
  }
`;

const SIGN_UP = gql`
  mutation signup(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $city: String!
    $state: String!
    $industry: ID
    # $image: String,
    $personal_url: String
    $portfolio_url: String
    $twitter_url: String
    $linkedin_url: String
    $github_url: String
  ) {
    signup(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      city: $city
      state: $state
      # image: $image,
      personal_url: $personal_url
      portfolio_url: $portfolio_url
      industry: $industry
      twitter_url: $twitter_url
      linkedin_url: $linkedin_url
      github_url: $github_url
    ) {
      token
      user {
        first_name
        id
      }
    }
  }
`;

//COM-ponent
const SignUpForm = props => {
  //Get industry list
  const { data } = useQuery(GET_INDUSTRIES);
  console.log(data && data.industries);

  //Set user object
  const [user, setUser] = useState({});

  const [signup, signupStatus] = useMutation(SIGN_UP);

  //Form management/validation
  const userSchema = object({
    first_name: string().required("Please enter your first name"),
    last_name: string().required("Please enter your last name"),
    email: string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    industry: mixed().required("Please select your industry"),
    city: string().required("Please enter your city"),
    state: string().required("Please enter your state")
  });

  const validateUser = () => {
    userSchema.validate(user, { abortEarly: false }).catch(err => {
      setValError(err.errors);
      console.log(err.errors);
    });
  };

  const handleChange = e => {
    if (e.target.vale === null) {
      setUser({
        ...user
      });
    } else {
      validateUser();
      setUser({
        ...user,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateUser();
    signup({ variables: user })
      .then(results => {
        console.log(results);
        let token = results.data.signup.token;
        //   loginStatus.error = null;
        localStorage.setItem("token", token);
        setProgress(progress + 1);
        setTimeout(() => {
          props.history.push("/signin");
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(user);
  };

  //Check if form is filled out and validated/activate next button
  const reqInput = document.getElementsByTagName("input");
  const [valError, setValError] = useState();
  const checkInput = i => {
    for (i = 0; i < reqInput.length; i++) {
      if (valError) {
        return false;
      } else {
        return true;
      }
    }
  };

  console.log(valError);

  //Set form step
  const [progress, setProgress] = useState(1);

  const handleNext = e => {
    e.preventDefault();
    setProgress(progress + 1);
    console.log(progress);
  };
  const handleBack = e => {
    e.preventDefault();
    setProgress(progress - 1);
    console.log(progress);
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <ul className="progressbar">
        <li className={progress >= 2 ? "active" : null}>Basic Info</li>
        <li className={progress >= 3 ? "active" : null}>Experience</li>
        <li className={progress >= 3 ? "active" : null}>Success</li>
      </ul>

      <form onSubmit={handleSubmit}>
        {(function() {
          switch (progress) {
            case 1:
              return (
                <>
                  <GeneralSignUp
                    user={user}
                    data={data}
                    handleChange={handleChange}
                  />
                  {checkInput() ? (
                    <button className="form-btn" onClick={handleNext}>
                      Next
                    </button>
                  ) : (
                    <button className="form-btn" disabled>
                      Next
                    </button>
                  )}
                  {valError
                    ? valError.map(message => {
                        return <p>{message}</p>;
                      })
                    : null}
                </>
              );
            case 2:
              return (
                <>
                  <ExpSignUp user={user} handleChange={handleChange} />
                  <button className="form-btn" onClick={handleBack}>
                    Back
                  </button>
                  <button className="submit-btn" type="submit">
                    Submit
                  </button>
                  {valError
                    ? valError.map(message => {
                        return <p>{message}</p>;
                      })
                    : null}
                </>
              );
            case 3:
              return (
                <>
                  <CompletedSignUp />
                </>
              );
            default:
              return <>Error</>;
          }
        })()}

        <br />
      </form>
    </div>
  );
};

export default SignUpForm;

/*

required fiieds

name
password
email
city
state

optional fields

image
gender
personal_url
blog_url
twitter_url
portfolio_url
linkedin_url
github_url
bio
payment_info


*/
