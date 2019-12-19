import React from 'react';

import ResumeQContainer from '../../ResumeQ/ResumeQ';
import { Resumeq } from '../icons/resumeqicon';

const ResumeQ = () => {
  return
  <Switch>
    <Route path='/resumeq' component={ResumeQContainer} />
  </Switch>
}

export default Resumeq;
