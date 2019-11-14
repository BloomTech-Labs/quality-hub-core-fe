import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
// import styled from "styled-components";
import Loading from "../Loading";
import { Link } from "react-router-dom";

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
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const [login, loginStatus] = useMutation(LOGIN);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    //Add validation checking here

    e.preventDefault();
    setLoading(true);
    let { email, password } = user;
    login({ variables: { email, password } })
      .then(res => {
        setLoading(false);
        let token = res.data.login.token;
        localStorage.setItem("token", token);
        localStorage.setItem("id", res.data.login.user.id);
        props.history.push("/dashboard");
        props.setLoggedin(true);
      })
      .catch(err => {
        setLoading(false);
      });
    console.log(user);
  };

  return (
    <div className="sign-in-form">
      <h1>Quality Hub</h1>
      <h2>Welcome back!</h2>
      <br />
      {/* Insert Google Login Button Here */}
      {/* <h2 className="sign-in-or">
        <span>OR</span>
      </h2> */}

      <form onSubmit={handleSubmit}>
        <div className="input-label">
          <label htmlFor="email">Email</label>
          <br />
          <input
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            id="email"
          />
        </div>
        <br />
        <div className="input-label">
          <label htmlFor="password"> Password </label>
          <br />
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
          <Link to="/signIn-ForgotPassword">Forgot password?</Link>
        </div>
        <br />
        {!loading && (
          <button className="submit-btn sign-in-button">Sign in</button>
        )}
        {!loading && (
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        )}
        {loading && <Loading />}
      </form>
    </div>
  );
};

export default SignInForm;
