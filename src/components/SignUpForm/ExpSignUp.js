import React from 'react';

const ExpSignUp=({ handleChange, user }) => {
    return(
        <div className="exp-sign-up">
            <div className="input-label">
          <label htmlFor="sign-up-linkedin">LinkedIn</label>
          <br />
          <input
            id="sign-up-linkedin"
            name="linkedin_url"
            placeholder="URL"
            value={user.linkedin_url}
            onChange={handleChange}
          />
        </div>
        <div className="input-label">
          <label htmlFor="sign-up-github">GitHub</label>
          <br />
          <input
            id="sign-up-github"
            name="github_url"
            placeholder="URL"
            value={user.github_url}
            onChange={handleChange}
          />
        </div>
        <div className="input-label">
          <label htmlFor="sign-up-portfolio">Portfolio</label>
          <br />
          <input
            id="sign-up-portfolio"
            name="portfolio_url"
            placeholder="URL"
            value={user.portfolio_url}
            onChange={handleChange}
          />
        </div>
        <div className="input-label">
          <label htmlFor="sign-up-website">Website</label>
          <br />
          <input
            id="sign-up-website"
            name="personal_url"
            placeholder="URL"
            value={user.personal_url}
            onChange={handleChange}
          />
        </div>
        <div className="input-label">
          <label htmlFor="sign-up-twitter">Twitter</label>
          <br />
          <input
            id="sign-up-twitter"
            name="twitter_url"
            placeholder="URL"
            value={user.twitter_url}
            onChange={handleChange}
          />
        </div>
      <br />
        </div>
    )
}

export default ExpSignUp;