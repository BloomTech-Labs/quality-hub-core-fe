import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
// import LandingPage from '../../Core/components/LandingPage';
import LandingPage from '../../Core/components/LandingPageNew';
import Dashboard from '../components/Dashboard';
import SignInForm from '../../Core/components/SignInForm';
import SignUpForm from '../../Core/components/SignUpForm';
import ForgotPassword from '../../Core/components/SignInForm/subs/ForgotPassword';
import PrivateRoute from '../../global/components/PrivateRoute';
import ChargeButton from '../../Core/components/Stripe/subs/ChargeButton';

// auth0
import Callback from '../../global/components/Auth/Callback';
import auth from '../../global/components/Auth/Auth';

class Core extends Component {
	async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path='/'
					render={props => (
						<LandingPage
							{...props}
							loggedin={props.loggedin}
							setLoggedin={props.setLoggedin}
						/>
					)}
				/>
				<Route
					path='/signin'
					render={props => (
						<SignInForm
							{...props}
							loggedin={props.loggedin}
							setLoggedin={props.setLoggedin}
						/>
					)}
				/>
				<Route path='/forgotPassword' component={ForgotPassword} />
				<Route
					path='/signup'
					render={props => (
						<SignUpForm
							{...props}
							loggedin={props.loggedin}
							setLoggedin={props.setLoggedin}
						/>
					)}
				/>
				<PrivateRoute
					path='/dashboard'
					component={Dashboard}
					setLoggedin={this.props.setLoggedin}
				/>
				<Route path='/charge' component={ChargeButton} />
				<Route exact path='/callback' component={Callback} />
			</Switch>
		);
	}
}

export default withRouter(Core);
