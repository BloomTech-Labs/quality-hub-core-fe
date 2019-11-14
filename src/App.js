import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
// import GetStarted from './components/SignUpForm/GetStarted';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import './global/index.scss';

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
			<Switch>
				<Route exact path='/' render={props => <LandingPage {...props} />} />
				<Route
					path='/signin'
					render={props => (
						<SignInForm
							{...props}
							loggedin={loggedin}
							setLoggedin={setLoggedin}
						/>
					)}
				/>
				{/* <Route path='/getstarted' component={GetStarted} /> */}
				<Route path='/signup' component={SignUpForm} />
				<PrivateRoute
					path='/dashboard'
					component={Dashboard}
					setLoggedin={setLoggedin}
				/>
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
