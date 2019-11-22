import React from 'react';
import './Footer.scss';

import fb from '../../../globalIcons/fb.svg';
import linkedin from '../../../globalIcons/linkedin.svg';
import twitter from '../../../globalIcons/twitter.svg';

export default function Footer() {
	return (
		<div className='footer'>
			<div className='footer-center'>
				<div className='footer-links'>
					<a href='/'>
						<p>About</p>
					</a>
					<a href='/'>
						<p>Privacy</p>
					</a>
					<a href='/'>
						<p>Terms</p>
					</a>
				</div>
				<span>
					<hr className='footer-line' />
				</span>
				<div className='footer-icons'>
					<a href='/'>
						<img src={fb} alt='facebook icon' />
					</a>
					<a href='/'>
						<img src={linkedin} alt='linkedin icon' />
					</a>
					<a href='/'>
						<img src={twitter} alt='twitter icon' />
					</a>
				</div>
			</div>
			<p className='copyright'> &#169; QualityHub 2019</p>
		</div>
	);
}
