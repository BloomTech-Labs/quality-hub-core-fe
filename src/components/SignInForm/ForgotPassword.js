import React, { useState } from "react";
import { Link } from "react-router-dom";
import './SignInForm.scss';

const ForgotPassword = () => {
    const [forgotpass, setForgotPass ] = useState({
        email: "",
    });

    const handleChange = e => {
        setForgotPass({
          ...forgotpass,
          [e.target.name]: e.target.value
        });
      };


const handleSubmit = e => {
    e.preventDefault();
};


return (
    <div>
    <h1>Quality Hub</h1>
    <h3>Welcome Back!</h3>

 <h1>Reset Your Passsword</h1>

 <h3>Enter your email address and we will send you a link to reset your password!</h3>
  <div className="forgotpass-Sub">
        <input
            placeholder="Email"
            name="email"
            value={forgotpass.email}
            onChange={handleChange}
            id="email"
          />
    <button className="forgotPass">Send Request Link</button> 
    <Link to="/signIn">Back to sign in</Link>
    </div>
    </div>
);

};
export default ForgotPassword;