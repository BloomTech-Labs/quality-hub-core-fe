import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <div className="App">

      {/* 
      Landing Page
        sign in
          dashboard
        sign up
          wizard
            dashboard
        interview q
        other features
      
      */}
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/signin' component={SignInForm} />
        <Route exact path='/signup' component={SignUpForm} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}



export default App;
