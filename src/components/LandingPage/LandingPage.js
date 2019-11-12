import React from 'react';
import './LandingPage.scss';

import Features from './Features';
import Panels from './Panels';

const LandingPage = props => {
  // array with texts to type in typewriter
  let dataText = ['Interviews', 'Code', 'Designs', 'Resumes', 'Quailcoin'];

  // type one text in the typewriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // check if text isn't finished yet
    if (i < text.length) {
      // add next character to h1
      if (document.querySelector('.typewriter')) {
        document.querySelector('.typewriter').textContent = text.substring(
          0,
          i + 1,
        );
      }
      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 1500);
    }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    if (typeof dataText[i] == 'undefined') {
      setTimeout(function() {
        StartTextAnimation(0);
      }, 1500);
    }
    if (i < dataText.length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function() {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
      });
    }
  }
  // start the text animation
  StartTextAnimation(0);

  return (
    <div>
      <div className='banner'>
        <h1>
          The best way to assess the quality of{' '}
          <span className='typewriter'></span>
          <span className='blinking-cursor'>|</span>
        </h1>
        <p>
          QualityHub offers the opportunity for anyone to have experienced
          professionals assess the quality of anything.
        </p>
        <button className='start-btn'>Get Started</button>
      </div>
      <Features />
      <Panels />
    </div>
  );
};

export default LandingPage;
