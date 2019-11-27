// Libraries
import React from 'react';

// Styles
import './LandingPage.scss';

// Components
import Header from './Header';
import Carousel from './Carousel';
import Panels from './Panels';
import Footer from './Footer';

export default function LandingPage() {
	return (
		<div>
			<Header />
			<Carousel />
			<Panels />
			<Footer />
		</div>
	);
}
