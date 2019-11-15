import React, { useState } from "react";
import { Link } from "react-router-dom";
// import './SignInForm.scss';
import './ForgotPassword.scss';

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


// const handleSubmit = e => {
//     e.preventDefault();
// };


return (
    <div>
    <h1>Quality Hub</h1>
    <h2>Welcome Back!</h2>
    <br></br>

 <h1>Reset Your Passsword</h1>

 <h2>Enter your email address and we will send you a link to reset your password!</h2>
  <div className="forgotpass-Sub">
   <div className="inputBox">
   <label htmlFor="email">Email</label>
   <br></br>
        <input
            placeholder="Email"
            name="email"
            value={forgotpass.email}
            onChange={handleChange}
            id="email"
          />
          </div>
    <button className="forgotPass">Send reset link</button> 
    <Link to="/signIn">Back to sign in</Link>
    </div>
    </div>
);

};
export default ForgotPassword;