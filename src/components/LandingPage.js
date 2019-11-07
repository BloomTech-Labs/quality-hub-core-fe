import React from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const LandingPage = () => {
    return (
        <StyledLandingPage>
            <div className='top-left'>
                <NavLink to='/'><p>QualityHub</p></NavLink>
                <p>imagine quial img</p>
            </div>
            <div>
                <NavLink to='signup'> Sign up</NavLink>
                <NavLink to='signin'> Sign in</NavLink>
                {/* <NavLink to='dashboard'> Dashboard</NavLink> */}
                <p>dropdown menu?</p>
            </div>
        </StyledLandingPage>
    );
}

const StyledLandingPage = styled.div`
    background-color: red;
    .top-left {
        display:flex;
    }
`;

export default LandingPage;