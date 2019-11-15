import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard/index.js";
import SignInForm from "./components/SignInForm/index.js";
import ForgotPassword from "./components/SignInForm/ForgotPassword.js";
import SignUpForm from "./components/SignUpForm/index.js";
import NavBar from "./components/NavBar";
import PrivateRoute from './components/PrivateRoute';
import Footer from "./components/Footer/"
import "./global/index.scss";

function App() {
	const [loggedin, setLoggedin] = useState(false);

  return (
    <div className="App">
      <Route path ="/" render={props => <NavBar {...props} loggedin={loggedin} setLoggedin={setLoggedin} />} />
      <Switch>
        <Route exact path="/" render={props => <LandingPage {...props} />} />
        <Route
          path="/signin"
          render={props => (
            <SignInForm
              {...props}
              loggedin={loggedin}
              setLoggedin={setLoggedin}
            />
          )}
        />
        <Route path="/forgotPassword" component={ForgotPassword}/>
        <Route path="/signup" component={SignUpForm} />
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
