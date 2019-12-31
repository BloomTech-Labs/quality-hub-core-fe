import React from 'react';
import { Link } from 'react-router-dom';

import CallToActionButton from './6_CallToActionButton';

export default function Footer() {
	return (
		<div className='landing-page-footer'>
			<h2>Power up your career with help from the best.</h2>
			<CallToActionButton />
			<hr />
			<div className='landing-page-footer-logo'>QualityHub</div>
			<div className='landing-page-footer-row'>
				<div>{'\u00a9'} Copyright 2020 QualityHub</div>
				<div className='landing-page-footer-links'>
					<Link>About</Link>
					<Link>Privacy</Link>
					<Link>Terms</Link>
				</div>
				<div className='landing-page-footer-social'>BLAH</div>
			</div>
		</div>
	);
}
