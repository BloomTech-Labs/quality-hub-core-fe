import React, { useState, useEffect } from "react";
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
    $industry: ID!
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

  //Set user object
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    industry: "",
    personal_url: "http://",
    portfolio_url: "http://",
    twitter_url: "http://",
    linkedin_url: "http://",
    github_url: "http://",
  });
 
  const [signup, error] = useMutation(SIGN_UP);

  console.log(error)
  //Form management/validation
  useEffect(()=>{
    validateUser();
  }, [user]);

  const userSchema = object({
    first_name: string().required("Please enter your first name"),
    last_name: string().required("Please enter your last name"),
    email: string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    industry: string().required("Please select your industry"),
    city: string().required("Please enter your city"),
    state: string().required("Please enter your state"),
    password: string().min(6, 'Password must be at least 6 characters').required('Please enter a password'),
    linkedin_url: string(),
    github_url: string(),
    personal_url: string(),
    portfolio_url: string(),
    twitter_url: string(),
  });

  const [valError, setValError] = useState();
  const validateUser = () => {
    console.log(user);
    userSchema.validate(user, { abortEarly: false })
    .then(res=>{
      console.log("SUCCESS. NO MORE ERRORS", res)
      setValError();
    })
    .catch(err => {
      
      setValError(err.errors);
      console.log(err.errors);
    });
  };
 

  const handleChange = e => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      });
  };

  const [gqlErr, setGqlErr] = useState(null)
  const handleSubmit = e => {
    e.preventDefault();
    validateUser();
    signup({ variables: user })
      .then(results => {
        console.log(results);
        // let token = results.data.signup.token;
        // localStorage.setItem("token", token);
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
 
  //Set form step
  const [progress, setProgress] = useState(1);

  const handleNext = e => {
    e.preventDefault();
    setProgress(progress + 1);
  };
  const handleBack = e => {
    e.preventDefault();
    setProgress(progress - 1);
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
                  {valError ? (
                    <button className="form-btn" disabled>
                      Next
                    </button>
                  ) : (
                    <button className="form-btn" onClick={handleNext}>
                      Next
                    </button>
                  )}
                  {valError
                    ? valError.map(message => {
                        return <p key={message}>{message}</p>;
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
               {error.error ? <p>This email address is already in use- please enter a unique email address</p> : null}
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