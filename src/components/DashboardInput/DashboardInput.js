import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import './DashboardInput.scss';

import { capitalize } from '../../utils/capitalize';

//GraphQuail Mutation
const EDIT_USER = gql`
  mutation update(
    $first_name: String
    $last_name: String
    $email: String
    $city: String
    $state: String 
    $gender: String, 
    $personal_url: String, 
    $blog_url: String,
    $twitter_url: String,
    $linkedin_url: String, 
    $github_url: String, 
    $portfolio_url: String,
    $bio: String,
    $payment_info: Boolean,
  ) {
    update(
      first_name: $first_name
      last_name: $last_name
      email: $email
      city: $city
      state: $state 
      gender: $gender, 
      personal_url: $personal_url, 
      blog_url: $blog_url,
      twitter_url: $twitter_url,
      linkedin_url: $linkedin_url, 
      github_url: $github_url, 
      portfolio_url: $portfolio_url,
      bio: $bio,
      payment_info: $payment_info,
    ) {
      id
    }
  }
`;

//Component
const DashboardInput = ({ userKey, userValue }) => {
  const [original, setOriginal] = useState(userValue);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    [userKey]: userValue,
  });

  const [changeField, changeFieldMutation] = useMutation(EDIT_USER);
  const handleChange = e => {
    setUser({
      [userKey]: e.target.value,
    });
  };

  const handleSubmit = e => {

    e.preventDefault();
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //this checks to see if the user pressed accept, but didn't make any changes.
    //if so, no mutation request is made
    if(original == user[userKey]){
      setEditing(false);
      return;
    }
    
    //check if valid email
    if(userKey=='email'){
      if(!user[userKey].match(mailFormat)){
        console.log('not an email address');
        setUser({
          [userKey]: original,
        });
        setEditing(false);
        return;
      } 
    }

    //this makes sure any required fields are not submitted as blank strings
    if((userKey == "first_name" || userKey == "last_name" || userKey || "email" || userKey == "city" || userKey == "state") && user[userKey] != ""){
      console.log('submit');
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
        [userKey]: original,
      });
      setEditing(false)
      // alert("This is a required field. It cannot be blank.");
    }    

    console.log(user);
  };

  const handleCancel = () => {
    setUser({
      [userKey]: original,
    });
    setEditing(false);
  };

  console.log(user);
  return (
    <div className='dash-input'>
      <div className='dash-row'>
        <span className='dash-heading'>
          <h2>{capitalize(userKey)}</h2>
        </span>
        <div>
          
          {editing ? (
            <input
              name={userKey}
              placeholder={original}
              onChange={handleChange}
              value={user.userKey}
            />
          ) : 
            userKey != 'industries' ? (<p>{user[userKey]}</p>) : user[userKey][0] ? <p>{user[userKey][0].name}</p> : <p></p>}
          
        </div>
      </div>
      <div>
        {editing && (
          <button onClick={() => handleCancel()} className='cancel-button'>
            X
          </button>
        )}
        {editing && (
          <button onClick={e => handleSubmit(e)} className='accept-button'>
            &#x2713;
          </button>
        )}
      </div>
      {!editing && (
        <button className='edit-button' onClick={() => setEditing(true)}>
          &#x1F589;
        </button>
      )}
    </div>
  );
};

export default DashboardInput;
