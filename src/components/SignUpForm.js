import React, { useState } from 'react';

const SignUpForm = () => {
    const [user, setUser] = useState({
        name: "",
        password: "",
        email: "",
        city: "",
        state: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        //Add validation checking here

        e.preventDefault();
        console.log(user);
    }
    return (
        <div>Sign up form


            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="name" value={user.name} onChange={handleChange} /><br />
                <input name="password" placeholder="password" value={user.password} onChange={handleChange} /><br />
                <input name="email" placeholder="email" value={user.email} onChange={handleChange} /><br />
                <input name="city" placeholder="city" value={user.city} onChange={handleChange} /><br />
                <input name="state" placeholder="state" value={user.state} onChange={handleChange} /><br />
                <button>Submit</button>
            </form>
        </div>
    );
}

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