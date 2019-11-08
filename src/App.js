import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/signin' component={SignInForm} />
        <Route path='/signup' component={SignUpForm} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}



export default App;
