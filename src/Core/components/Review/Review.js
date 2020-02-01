import React, { useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom'
import ReviewForm from './subs/1_ReviewForm';
import Modal from './subs/3_Modal';
import styled, { keyframes } from 'styled-components';

// import './RQReviewPage.scss';
// import styles from './subs/RQModal.module.scss';

// TODO move comments to global component
// TODO: add state for message relating to service.. 
// * Important

const Context = React.createContext();

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
      <Context.Provider value={context}>
        {children}
      </Context.Provider>
      <div ref={modalRef} />
    </Container>
  )
}

export const Review = ({ job, modalOpen, setModalOpen,
}) => {

  const reviewModal = useContext(Context)


  // Refreshing causese job to be undefined, so we go back a page
  // if (!props.location.job) {
  //   props.history.push('/resumeq/seekerpanel');
  // }

  //false sets the default to not show the Done modal
  // const [open, setOpen] = useState(false);

  // const closeWindow = () => {
  //   setOpen(true)
  //   setTimeout(() => {
  //     history.push('/resumeq/seekerpanel');
  //   }, 200)
  // }

  // if (window.location.includes('rating')) {
  //   alert(window.location)
  // }

  //This sets the darkened overlay behind the modals
  // useEffect(() => {
  //   if (open) {
  //     document.getElementById('iq-review-page').style.display = 'block';
  //   } else {
  //     document.getElementById('iq-review-page').style.display = 'none';
  //   }
  // }, [open]);

  return reviewModal ? ReactDOM.createPortal(
    <Overlay>
      <Dialog>
        <ReviewForm job={job} setModalOpen={setModalOpen} />
      </Dialog>
    </Overlay>, reviewModal
  )
    : null;
  //   < div >
  //   <div id='iq-review-page' className={styles.overlay} onClick={closeWindow}></div>
  //     { open && <Modal closeWindow={closeWindow} /> }
  // <div className='RQreview-page'>
  //   <h2>Rating & Review</h2>
  //   <hr />
  //   <p>Your review will help other job seekers find the best coach.</p>
  // </div>
  //   </div >

}

// * Styling Features

const fadeIn = keyframes`from { opacity: 0; }`;

const Container = styled.div`
  position: relative;
  z-index: 0;
`;


const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const Dialog = styled.div`
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

export default Review;
