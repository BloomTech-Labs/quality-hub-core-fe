import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom'
import ReviewForm from './subs/1_ReviewForm';
import Modal from './subs/3_Modal';

import { ModalContext } from '../../../global/components/ModalProvider/ModalProvider'
import { Overlay, Dialog, } from '../../../global/components/ModalProvider/StyledComponents'
// import './RQReviewPage.scss';
// import styles from './subs/RQModal.module.scss';

// // TODO move comments to global component
// // TODO: add state for message relating to service.. and incorporate into ModalProvider


export const Review = ({ job, modalOpen, setModalOpen, query
}) => {
  const reviewModal = useContext(ModalContext);
  const [showReviewForm, setShowReviewForm] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  console.log(`Review // reviewModal`, reviewModal);


  const closeModal = () => {
    setModalOpen(false)
  }

  const afterSubmit = () => {
    setShowConfirmation(true)
    setShowReviewForm(false)
    setTimeout(() => {
      closeModal()
      window.location.reload()
    }, 1500)
  }



  return reviewModal ? ReactDOM.createPortal(
    <Overlay>
      <Dialog>
        {showReviewForm && <ReviewForm job={job} setShowReviewForm={setShowReviewForm} setShowConfirmation={setShowConfirmation} afterSubmit={afterSubmit} closeModal={closeModal} query={query} />}
        {showConfirmation && <Modal setModalOpen={setModalOpen} closeModal={closeModal} />}
      </Dialog>
    </Overlay>, reviewModal
  )
    : null;


}


export default Review;
