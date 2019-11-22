import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPageCTA() {
	const [ctaShow, setCtaShow] = useState(true);
	const [loggedin, setLoggedin] = useState(false);
	const [iscoach, setIscoach] = useState(false);

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
								{loggedin ? (
									<Link to='/addcoach'>Click here</Link>
								) : (
									<a href='https://qualityhub.netlify.com/signin'>Click here</a>
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
