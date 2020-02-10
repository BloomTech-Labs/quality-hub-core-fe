import styled, { keyframes } from 'styled-components';


// * Styling Features

export const fadeIn = keyframes`from { opacity: 0; }`;

export const Container = styled.div`
  position: relative;
  z-index: 0;
`;


export const Overlay = styled.div` 
  animation: ${fadeIn} 200ms ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

export const Dialog = styled.div`
  background: white;
  border-radius: 5px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 33%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
