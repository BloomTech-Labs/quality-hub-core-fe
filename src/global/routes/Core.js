import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../../Core/components/LandingPage';
import Dashboard from '../components/Dashboard';
import SignInForm from '../../Core/components/SignInForm';
import SignUpForm from '../../Core/components/SignUpForm';
import ForgotPassword from '../../Core/components/SignInForm/ForgotPassword';
import PrivateRoute from '../../global/components/PrivateRoute';


function Core({ loggedin, setLoggedin }) {
	return (
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
	);
}

export default Core;