import React from 'react';
import { Route } from 'react-router-dom';

//local imports 
import Marketplace from './components/Marketplace'



const ResumeQContainer = () => {

  return (
    <>
      <div>
        {/* add routes for components as they're built out */}
        <h3>Resumé Q</h3>
        <p>Welcome to Resumé Q</p>
        <div>
          <Marketplace />
        </div>
      </div>
    </>
  )
}


export default ResumeQContainer;
