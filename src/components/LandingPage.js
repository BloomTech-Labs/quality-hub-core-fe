import React from 'react';
import styled from 'styled-components';

const LandingPage = () => {
  return (
    <StyledLandingPage>
      <div className='banner'>
        <h1>The best way to assess the quality of skill.</h1>
        <p>
          QualityHub offers the opportunity for anyone to have experienced
          professionals assess the quality of anything.
        </p>
        <GetStartedBtn>Get Started</GetStartedBtn>
      </div>
      <div className='features'>
        <h3>Features</h3>
      </div>
    </StyledLandingPage>
  );
};

const StyledLandingPage = styled.div`
  .banner {
    background-color: #eaeaea;
    h1 {
      margin: 0;
    }
    padding: 8rem 0;
  }
`;

const GetStartedBtn = styled.button`
  background-color: white;
  border: 1px solid silver;
  font-family: inherit;
  padding: 1.5rem 5%;
  border-radius: 0.3rem;
  cursor: pointer;
`;

export default LandingPage;
