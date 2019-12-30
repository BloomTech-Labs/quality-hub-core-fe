import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ResumeQContainer from '../../ResumeQ/ResumeQ';
import { Resumeq } from '../icons/resumeqicon';

const ResumeQ = () => {
  return (
    <Switch>
      <Route path='/resumeq' component={ResumeQContainer} />
    </Switch>)
}

export default ResumeQ;
