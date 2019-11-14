import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import GeneralSignUp from "./GeneralSignUp.js";
import ExpSignUp from "./ExpSignUp.js";
import CompletedSignUp from "./CompletedSignUp";
// import * as yup from 'yup';
import { string, object } from "yup";
import "./SignUpForm.scss";

const SIGN_UP = gql`
  mutation signup(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $city: String!
    $state: String!
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
      personal_url: $personal_url
      portfolio_url: $portfolio_url
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
  const [emailTouched, setEmailTouched] = useState(false);
  const [firstTouched, setFirstTouched] = useState(false);
  const [lastTouched, setLastTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [stateTouched, setStateTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  //Set user object
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    personal_url: "http://",
    portfolio_url: "http://",
    twitter_url: "http://",
    linkedin_url: "http://",
    github_url: "http://"
  });

  const [signup, error] = useMutation(SIGN_UP);

  //Form management/validation
  useEffect(() => {
    validateUser();
  }, [user]);

  const userSchema = object({
    first_name: string().required("Please enter your first name"),
    last_name: string().required("Please enter your last name"),
    email: string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    city: string().required("Please enter your city"),
    state: string().required("Please enter your state"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter a password"),
    linkedin_url: string(),
    github_url: string(),
    personal_url: string(),
    portfolio_url: string(),
    twitter_url: string()
  });

  const [valError, setValError] = useState();
  const validateUser = () => {
    userSchema
      .validate(user, { abortEarly: false })
      .then(res => {
        setValError();
      })
      .catch(err => {
        setValError(err.errors);
      });
  };

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // const [gqlErr, setGqlErr] = useState(null)
  const handleSubmit = e => {
    e.preventDefault();

    //if URL is left as default, just remove http:// and submit as empty string
    const urlArray = [
      "personal_url",
      "portfolio_url",
      "twitter_url",
      "linkedin_url",
      "github_url"
    ];
    let submitUser = { ...user };
    urlArray.forEach(item => {
      if (submitUser[item] == "http://") {
        submitUser[item] = "";
      }
    });

    //Isn't this redundant? You would not be able to submit if it was already validated, right?
    validateUser();

    signup({ variables: submitUser })
      .then(results => {
        // console.log(results);
        // let token = results.data.signup.token;
        // localStorage.setItem("token", token); //Should probably also set id to localStorage
        setProgress(progress + 1);
        setTimeout(() => {
          //Do we need to push to dashboard after sign up?
          props.history.push("/signin");
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
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
                    setEmailTouched={setEmailTouched}
                    setFirstTouched={setFirstTouched}
                    setLastTouched={setLastTouched}
                    setCityTouched={setCityTouched}
                    setStateTouched={setStateTouched}
                    setPasswordTouched={setPasswordTouched}
                    user={user}
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
                        if (message.includes("email") && !emailTouched) {
                          return null;
                        }
                        if (message.includes("first") && !firstTouched) {
                          return null;
                        }
                        if (message.includes("last") && !lastTouched) {
                          return null;
                        }
                        if (message.includes("city") && !cityTouched) {
                          return null;
                        }
                        if (message.includes("state") && !stateTouched) {
                          return null;
                        }
                        if (
                          (message.includes("password") ||
                            message.includes("Password")) &&
                          !passwordTouched
                        ) {
                          return null;
                        }

                        return (
                          <p key={message} className="validation-error-message">
                            {message}
                          </p>
                        );
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
                  {error.error ? (
                    <p>
                      This email address is already in use- please enter a
                      unique email address
                    </p>
                  ) : null}
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
