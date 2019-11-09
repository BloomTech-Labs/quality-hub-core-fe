import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const SIGN_UP = gql`
  mutation signup(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $city: String!
    $state: String! # $image: String, # $gender: String,
  ) # $personal_url: String,
  # $blog_url: String,
  # $linkedin_url: String,
  # $github_url: String,
  # $bio: String,
  {
    signup(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      city: $city
      state: $state # image: $image, # gender: $gender,
    ) # personal_url: $personal_url,
    # blog_url: $blog_url,
    # linkedin_url: $linkedin_url,
    # github_url: $github_url,
    # bio: $bio
    {
      token
      user {
        first_name
        id
      }
    }
  }
`;

const SignUpForm = props => {
  console.log(props);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    city: '',
    state: '',
    // image: "",
    // gender: "",
    // personal_url: "",
    // blog_url: "",
    // linkedin_url: "",
    // github_url: "",
    // bio: ""
  });

  const [signup, signupStatus] = useMutation(SIGN_UP);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    signup({ variables: user })
      .then(results => {
        console.log(results);
        let token = results.data.signup.token;
        //   loginStatus.error = null;
        localStorage.setItem('token', token);
        props.history.push('/signin');
      })
      .catch(err => {
        console.log(err);
      });
    console.log(user);
  };
  return (

    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className="two-inputs">
      <div className='input-label'>
          
          <label for="sign-up-first-name">First Name</label><br/>
        <input
        id="sign-up-first-name"
          name='first_name'
          placeholder='First Name'
          value={user.first_name}
          onChange={handleChange}
          required
        />
        </div>
        <br />
        
        <div className='input-label'>
          
          <label for="sign-up-first-name">Last Name</label><br/>
        <input
        id="sign-up-last-name"
          name='last_name'
          placeholder='Last Name'
          value={user.last_name}
          onChange={handleChange}
          required
        />
        </div>
        </div>
        <br />
        <div className='input-label'>
          
          <label for="sign-up-password">Password</label><br/>
        <input
        id='sign-up-password'
          name='password'
          placeholder='Password'
          value={user.password}
          onChange={handleChange}
          required
        />
        </div>
        <br />
        <div className='input-label'>
          
          <label for="sign-up-email">Email</label><br/>
        <input
        id='sign-up-email'
          name='email'
          placeholder='Email'
          value={user.email}
          onChange={handleChange}
          required
        />
        </div>
        <br />

        <div className="two-inputs">
        <div className='input-label'>
          
          <label for="sign-up-city">City</label><br/>
        <input
        id="sign-up-city"
          name='city'
          placeholder='City'
          value={user.city}
          onChange={handleChange}
          required
        />
        </div>
        <br />

        <div className='input-label'>
          
          <label for="sign-up-state">State</label><br/>
        <input
        id="sign-up-state"
          name='state'
          placeholder='State'
          value={user.state}
          onChange={handleChange}
          required
        />
        </div>
        </div>
        <br />
        <button className='submit-btn'>Submit</button>
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
