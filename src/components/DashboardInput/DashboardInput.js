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
    $state: String # $blog_url: String, # $image: String, # $gender: String, # $personal_url: String, # $linkedin_url: String, # $github_url: String, # $bio: String,
  ) {
    update(
      first_name: $first_name
      last_name: $last_name
      email: $email
      city: $city
      state: $state # blog_url: $blog_url, # image: $image, # gender: $gender, # personal_url: $personal_url, # linkedin_url: $linkedin_url, # github_url: $github_url, # bio: $bio
    ) {
      id
      #   user {
      #     id
      #   }
    }
  }
`;

//Component
const DashboardInput = ({ userKey, userValue }) => {
  console.log(userKey);
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
    changeField({ variables: user })
      .then(res => {
        setOriginal(user[userKey]);
        e.preventDefault();
        setEditing(false);
      })
      .catch(err => {
        console.log(err);
      });

    console.log(user);
  };

  const handleCancel = () => {
    setUser({
      [userKey]: original,
    });
    setEditing(false);
  };

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
          ) : (
            <p>{user[userKey]}</p>
          )}
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
