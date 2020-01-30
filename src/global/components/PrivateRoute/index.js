import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// auth0
import auth from '../Auth/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return(
    <Route {...rest} 
      render = {props=> {
        if (!auth.isAuthenticated) return auth.login();
        
        return <Component {...rest} {...props} />;
    }} 
    />
  )
}

export default PrivateRoute;