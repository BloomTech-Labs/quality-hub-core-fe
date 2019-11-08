import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavBar = () => {

    return(
        <StyledNav>
            <div className='left'>
                <NavLink to='/'><p>QualityHub</p></NavLink>
                <img src="http://clipartmag.com/images/quail-clipart-1.jpg" /> 
            </div>
            <div className='right'>
                <NavLink to='signup'> Sign up</NavLink>
                <NavLink to='signin'> Sign in </NavLink>
                {/* <NavLink to='dashboard'> Dashboard</NavLink> */}
                <p>  dropdown menu?</p>
            </div>
        </StyledNav>
    )
}

const StyledNav = styled.div`
        background-color: red;
        display: flex;
        justify-content: space-between;
    
        .left {
            display: flex;
            img {
                width: 2.5rem;
            }
        }
        .right {
            display: flex;
            align-items: center;
        }
`;

export default NavBar;