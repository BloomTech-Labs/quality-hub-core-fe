import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './Core/components/LandingPage';
import Dashboard from './Core/components/Dashboard';
import SignInForm from './Core/components/SignInForm';
import ForgotPassword from './Core/components/SignInForm/ForgotPassword';
import SignUpForm from './Core/components/SignUpForm/';
import NavBar from './global/components/NavBar';
import PrivateRoute from './global/components/PrivateRoute';
import Footer from './Core/components/Footer';
import './globalStyles/index.scss';
import InterviewQ from './InterviewQ/InterviewQ';

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
				<Route path='/forgotPassword' component={ForgotPassword} />
				<Route path='/signup' component={SignUpForm} />
				<PrivateRoute
					path='/dashboard'
					component={Dashboard}
					setLoggedin={setLoggedin}
				/>
				
			</Switch>
			<InterviewQ />
			<Footer />
		</div>
	);
}

export default App;
