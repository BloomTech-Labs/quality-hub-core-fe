// Library
import React from 'react';
import { Route } from 'react-router-dom';
import Waiting from './subs/Waiting';
import Room from './subs/Room';

export default function Meeting() {
	return (
		<>
			<Route path='/interviewq/meeting' component={Waiting} />
			<Route path='/interviewq/meeting/room' component={Room} />
		</>
	);
}
