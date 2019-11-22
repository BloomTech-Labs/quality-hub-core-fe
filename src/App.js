import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './global/components/NavBar';
import Footer from './Core/components/Footer';
import './globalStyles/index.scss';
import InterviewQ from './global/routes/InterviewQ';
import Core from './global/routes/Core'

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
			<Core loggedin={loggedin} setLoggedin={setLoggedin}/>
			<InterviewQ loggedin={loggedin} setLoggedin={setLoggedin}/>
			<Footer />
		</div>
	);
}

export default App;
