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
    <form>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='first_name'
          placeholder='first name'
          value={user.first_name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name='last_name'
          placeholder='last name'
          value={user.last_name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name='password'
          placeholder='password'
          value={user.password}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name='email'
          placeholder='email'
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name='city'
          placeholder='city'
          value={user.city}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name='state'
          placeholder='state'
          value={user.state}
          onChange={handleChange}
          required
        />
        <br />
        <button className='submit-btn'>Submit</button>
      </form>
    </form>
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
