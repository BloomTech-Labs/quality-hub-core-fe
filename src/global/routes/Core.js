import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
// import LandingPage from '../../Core/components/LandingPage';
import LandingPage from "../../Core/components/LandingPageNew";
import Dashboard from "../components/Dashboard";
import ForgotPassword from "../../Core/components/SignInForm/subs/ForgotPassword";
import PrivateRoute from "../../global/components/PrivateRoute";
import ChargeButton from "../../Core/components/Stripe/subs/ChargeButton";
import SignUpForm from "../../Core/components/SignUpForm";

class Core extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <LandingPage {...props} />} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route
          path="/signup"
          render={props => (
            <SignUpForm
              {...props}
              
            />
          )}
        />
        <Route path="/charge" component={ChargeButton} />
        <Redirect from="/callback" to="/" />
      </Switch>
    );
  }
}

export default withRouter(Core);
