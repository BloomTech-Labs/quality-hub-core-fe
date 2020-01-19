import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './global/styles/index.scss';
import NavBar from './global/components/NavBar';
import InterviewQ from './global/routes/InterviewQ';
import ResumeQ from './global/routes/ResumeQ';
import Core from './global/routes/Core';

function App() {
	const [loggedin, setLoggedin] = useState(false);

	return (
		<div className='App'>
			<Route
				path='/'
				render={props => (
					<NavBar {...props} loggedin={loggedin} setLoggedin={setLoggedin} />
				)}
			/>
			<div className='not-nav'>
				<Core loggedin={loggedin} setLoggedin={setLoggedin} />
				<InterviewQ loggedin={loggedin} setLoggedin={setLoggedin} />
				<ResumeQ loggedin={loggedin} setLoggedin={setLoggedin} />
			</div>
		</div>
	);
}

export default App;
