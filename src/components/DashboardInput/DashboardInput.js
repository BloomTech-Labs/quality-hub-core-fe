import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import "./DashboardInput.scss";

import Pencil from "../../icons/Pencil";

import { statesArray } from "../SignUpForm/States";

import { capitalize } from "../../utils/capitalize";

//GraphQuail Mutation
export const EDIT_USER = gql`
  mutation update(
    $first_name: String
    $last_name: String
    $email: String
    $city: String
    $state: String
    $gender: String
    $personal_url: String
    $blog_url: String
    $twitter_url: String
    $linkedin_url: String
    $github_url: String
    $portfolio_url: String
    $bio: String
    $payment_info: Boolean
  ) {
    update(
      first_name: $first_name
      last_name: $last_name
      email: $email
      city: $city
      state: $state
      gender: $gender
      personal_url: $personal_url
      blog_url: $blog_url
      twitter_url: $twitter_url
      linkedin_url: $linkedin_url
      github_url: $github_url
      portfolio_url: $portfolio_url
      bio: $bio
      payment_info: $payment_info
    ) {
      id
    }
  }
`;

const POST_INDUSTRY_TO_USER = gql`
  mutation postIndustryToUser($industry_id: ID!) {
    postIndustryToUser(industry_id: $industry_id) {
      id
      name
    }
  }
`;

//Component
const DashboardInput = ({ userKey, userValue, industryData }) => {
  const [original, setOriginal] = useState(userValue);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    [userKey]: userValue
  });

  const [changeField, changeFieldMutation] = useMutation(EDIT_USER);
  const [changeIndustry, changeIndustryMutation] = useMutation(
    POST_INDUSTRY_TO_USER
  );
  const handleChange = e => {
    setUser({
      [userKey]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //this checks to see if the user pressed accept, but didn't make any changes.
    //if so, no mutation request is made
    if (original === user[userKey]) {
      setEditing(false);
      return;
    }

    //check if valid email
    if (userKey === "email") {
      if (!user[userKey].match(mailFormat)) {
        console.log("not an email address");
        setUser({
          [userKey]: original
        });
        setEditing(false);
        return;
      }
    }
    //Cannot leave state on Select
    if (userKey === "state") {
      if (user[userKey] === "Select") {
        console.log("Must pick a state");
        setUser({
          [userKey]: original
        });
        setEditing(false);
        return;
      }
    }

    if (userKey === "industries") {
      if (user[userKey] === "Select") {
        console.log("Must pick an industry");
        setUser({
          [userKey]: original
        });
        setEditing(false);
        return;
      } else {
        const objectData = {
          industry_id: user.industries
        };
        changeIndustry({ variables: { industry_id: user.industries } })
          .then(res => {
            console.log(res);
            setOriginal(industryData[user[userKey]]);
            setEditing(false);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    //this makes sure any required fields are not submitted as blank strings
    if (
      (userKey === "first_name" ||
        userKey === "last_name" ||
        userKey ||
        "email" ||
        userKey === "city" ||
        userKey === "state") &&
      user[userKey] !== ""
    ) {
      console.log("submit");
      changeField({ variables: user })
        .then(res => {
          setOriginal(user[userKey]);
          setEditing(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setUser({
        [userKey]: original
      });
      setEditing(false);
    }

    console.log(user);
  };

  const handleCancel = () => {
    setUser({
      [userKey]: original
    });
    setEditing(false);
  };

  const checkKeyName = () => {
    if (userKey === "industries") {
      if (user[userKey][0]) {
        return user[userKey][0].name;
      } else {
        return;
      }
    }

    if (userKey === "state") {
      return user[userKey];
    }

    return user[userKey];
  };

  const checkKeyNameForEdit = () => {
    if (userKey === "state") {
      return (
        <select
          id="sign-up-state"
          name="state"
          placeholder="State"
          value={user[userKey]}
          onChange={handleChange}
          required
        >
          <option>Select</option>
          {statesArray.map(state => (
            <option value={state} key={state}>
              {state}
            </option>
          ))}
        </select>
      );
    }
    console.log(userKey);
    if (userKey === "industries") {
      return (
        <select
          id="sign-up-industry"
          name="industry"
          placeholder="Industry"
          value={user[userKey] ? user[userKey][0].name : ""}
          onChange={handleChange}
          required
        >
          <option>Select</option>
          {industryData &&
            industryData.industries.map(industry => (
              <option value={industry.id} key={industry.id}>
                {industry.name}
              </option>
            ))}
        </select>
      );
    }
    console.log("here?");
    return (
      <input
        name={userKey}
        placeholder={original}
        onChange={handleChange}
        value={user.userKey}
      />
    );
  };

  return (
    <div className="dash-input">
      <div className="dash-row">
        <span className="dash-heading">
          <h2>{userKey && capitalize(userKey)}</h2>
        </span>
        <div>
          {editing ? (
            checkKeyNameForEdit() //check what kind of input field to return based on key name
          ) : (
            <p>{checkKeyName()}</p> //check if value is nested in an object based on key name
          )}
        </div>
      </div>
      <div className="update-btns">
        {editing && (
          <button onClick={() => handleCancel()} className="cancel-button">
            {/* X */}
            Cancel
          </button>
        )}
        {editing && (
          <button onClick={e => handleSubmit(e)} className="accept-button">
            {/* &#x2713; */}
            Save
          </button>
        )}
      </div>
      {!editing && (
        <button
          className="edit-button"
          onClick={() => setEditing(true)}
          data-testid="edit-button"
        >
          {/* &#x1F589; */}
          <Pencil />
        </button>
      )}
    </div>
  );
};

export default DashboardInput;
