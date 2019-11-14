import React, { useState } from "react";
import { Link } from "react-router-dom";


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
        <input
            placeholder="Email"
            name="email"
            value={forgotpass.email}
            onChange={handleChange}
            id="email"
          />
    <button>Send Request Link</button> 
    <Link to="/signIn">Back to sign in</Link>
    </div>
);

};
export default ForgotPassword;