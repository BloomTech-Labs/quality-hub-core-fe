import React, { useState, useEffect } from 'react';
import './LandingPage.scss';

import Features from './Features';
import Panels from './Panels';

const LandingPage = props => {
  // array with texts to type in typewriter
  let [animatedText, setText] = useState("");
  let dataText = ['Interviews', 'Code', 'Designs', 'Resumes', 'Quailcoin'];

  useEffect(() => {

    // Creates a word one letter at a time (a, ap, app, appl, apple)
    // After the word is complete, run a callback function that plays the next word
    const typeWriter = (text, idx, cb) => {
      if (idx < text.length) {
        setText(text.substring(0, idx + 1));
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, idx + 1, cb);
        }, 100);
      } else {
        // Plays call back after all text has been played
        // call callback after timeout
        setTimeout(cb, 1500);
      }
    }

    // start a typewriter animation for a text in the dataText array
    const startTextAnimation = (wordIdx) => {
      // Went through all words
      if (dataText[wordIdx]) {
        // text exists! start typewriter animation
        typeWriter(dataText[wordIdx], 0, () => {
          // after callback (and whole text has been animated), start next text
          startTextAnimation(wordIdx + 1);
        });
      } else {
        setTimeout(function() {
          startTextAnimation(0);
        }, 1500);
      }
    }

    // start the text animation
    startTextAnimation(0);
  }, [])

  return (
    <div>
      <div className='banner'>
        <h1>
          The best way to assess the quality of{' '}
          {animatedText}
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
