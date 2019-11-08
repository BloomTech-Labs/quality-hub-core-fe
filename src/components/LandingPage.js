import React from 'react';
import styled from 'styled-components'


const LandingPage = () => {
    return (
        <StyledLandingPage>
            <div className='banner'>
                <h1>the best way to assess the quality of skill.</h1>
                <p>QualityHub offers the oppurtunity for anyone to have experienced professionals asses the quality of anything</p>
                <button>Get Started</button>
            </div>
            <div className='features'>
                <h3>Features</h3>

            </div>
        </StyledLandingPage>
    );
}

const StyledLandingPage = styled.div`

    .banner {
        background-color: green;
        h1 {
            margin: 0;
        }
    }

`;

export default LandingPage;