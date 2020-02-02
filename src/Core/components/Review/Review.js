import React, { useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom'
import ReviewForm from './subs/1_ReviewForm';
import Modal from './subs/3_Modal';

import { ModalContext } from '../../../global/components/ModalProvider/ModalProvider'
import { Overlay, Dialog, } from '../../../global/components/ModalProvider/StyledComponents'
// import './RQReviewPage.scss';
// import styles from './subs/RQModal.module.scss';

// // TODO move comments to global component
// TODO: add state for message relating to service.. and incorporate into ModalProvider
// * Important



export const Review = ({ job, modalOpen, setModalOpen,
}) => {

  const reviewModal = useContext(ModalContext)


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


export default Review;
