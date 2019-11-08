import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        first_name
        id
      }
    }
  }
`;

const SignInForm = props => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [login, loginStatus] = useMutation(LOGIN);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    //Add validation checking here

    e.preventDefault();
    let { email, password } = user;
    login({ variables: { email, password } }).then(res => {
      console.log(res);
      let token = res.data.login.token;
      localStorage.setItem('token', token);
      localStorage.setItem('id', res.data.login.user.id);
      props.history.push('/dashboard');
    });

    console.log(user);
  };

  return (
    <div>
      Sign in form
      <form onSubmit={handleSubmit}>
        <input
          placeholder='email'
          name='email'
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder='password'
          name='password'
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <button>Sign in</button>
      </form>
    </div>
  );
};

export default SignInForm;
