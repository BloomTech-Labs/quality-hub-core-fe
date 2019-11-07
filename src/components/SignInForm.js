import React, { useState } from 'react';

const SignInForm = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
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
        <div>Sign in form
            <form onSubmit={handleSubmit}>
                <input placeholder="email" name="email" value={user.email} onChange={handleChange} /><br />
                <input placeholder="password" name="password" value={user.password} onChange={handleChange} /><br />
                <button>Sign in</button>
            </form>



        </div>
    );
}

export default SignInForm;