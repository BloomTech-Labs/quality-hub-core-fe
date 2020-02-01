import React, { useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom'


import { Container, Overlay, Dailog } from './StyledComponents';

export const ModalContext = React.createContext();

// * Component recieves location and job object (containing state relevant to review) from History component

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [context, setContext] = useState();

  useEffect(() => {
    setContext(modalRef.current)
  }, [])

  console.log(`Review >> ModalProvider // children`, children)

  return (
    <Container>
      <ModalContext.Provider value={context}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </Container>
  )
}
