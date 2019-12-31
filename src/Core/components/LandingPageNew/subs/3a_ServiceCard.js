import React from 'react';

export default function ServiceCard({ service }) {
	return (
		<div className='landing-page-service-card'>
			<div className='landing-page-service-card-img'></div>
			<div className='landing-page-service-card-txt'>
				<h3>{service.service}</h3>
				<p>{service.description}</p>
			</div>
		</div>
	);
}
