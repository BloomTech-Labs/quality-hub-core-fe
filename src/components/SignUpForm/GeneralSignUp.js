import React from 'react';
import { statesArray } from './States.js'

const GeneralSignUp = ({ user, handleChange, data }) => {


  
    return (
      <div className="general-sign-up">
        <div className="two-inputs">
          <div className="input-label">
            <label htmlFor="sign-up-first-name">First Name*</label>
            <br />
            <input
              id="sign-up-first-name"
              name="first_name"
              placeholder="First Name"
              value={user.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <br />

          <div className="input-label">
            <label htmlFor="sign-up-first-name">Last Name*</label>
            <br />
            <input
              id="sign-up-last-name"
              name="last_name"
              placeholder="Last Name"
              value={user.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <br />
        <div className="input-label">
          <label htmlFor="sign-up-password">Password*</label>
          <br />
          <input
            id="sign-up-password"
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="input-label">
          <label htmlFor="sign-up-email">Email*</label>
          <br />
          <input
            id="sign-up-email"
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div className="input-label" >
          <label htmlFor="sign-up-industry">Industry*</label>
          <br />
          <select
            id="sign-up-industry"
            name="industry"
            placeholder="Industry"
            value={user.industry}
            onChange={handleChange}
            required
            role='dropdown1'
          >
            <option>Select</option>
            {data &&
              data.industries.map(industry => (
                <option value={industry.id} key={industry.id}>
                  {industry.name}
                </option>
              ))}
          </select>
        </div>
        <br />

        <div className="two-inputs">
          <div className="input-label">
            <label htmlFor="sign-up-city">City*</label>
            <br />
            <input
              id="sign-up-city"
              name="city"
              placeholder="City"
              value={user.city}
              onChange={handleChange}
              required
            />
          </div>
          <br />

          <div className="input-label">
            <label htmlFor="sign-up-state">State/Territory*</label>
            <br />
            <select
              id="sign-up-state"
              name="state"
              placeholder="State"
              value={user.state}
              onChange={handleChange}
              required
            >
              <option>Select</option>
            {statesArray.map(state => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
          </select>
          </div>
        </div>
      </div>
    );
}

export default GeneralSignUp;