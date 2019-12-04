// Libaries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
export default function LandingPageCTA() {
	const [ctaShow, setCtaShow] = useState(true);
	const [loggedin, setLoggedin] = useState(false); // GOAL: Replace with Apollo Client cache state
	const [iscoach, setIscoach] = useState(false); // GOAL: Replace with Apollo Client cache state

	const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

const { data } = useLazyQuery(IS_LOGGED_IN);

	return (
		<div>
			{ctaShow && (
				<div className='interview-cta'>
					<div className='interview-cta-center'>
						{iscoach ? (
							<h4>
								Welcome back!{' '}
								<Link to='/'>Click here to view your coach profile</Link>
							</h4>
						) : (
							<h4>
								Are you interested in becoming a coach?{' '}
								{data && data.isLoggedIn ? (
									<Link to='/addcoach'>Click here</Link>
								) : (
									<Link to='/signin'>Click here</Link>
								)}
							</h4>
						)}
					</div>
					<button className='interview-cta-x' onClick={() => setCtaShow(false)}>
						X
					</button>
				</div>
			)}
		</div>
	);
}
