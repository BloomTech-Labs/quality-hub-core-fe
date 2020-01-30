import React, { useState, useEffect } from 'react';

import ReviewForm from './subs/1_ReviewForm';
import Modal from './subs/3_Modal';

import './ReviewPage.scss';
import styles from './subs/Modal.module.scss';

// TODO move comments to global component
// TODO: add state for message relating to service.. 
// * Important

const ReviewPage = (props) => {
  // Refreshing causese state to be undefined, so we go back a page
  // if (!props.location.state) {
  //   props.history.push('/resumeq/seekerpanel');
  // }

  //false sets the default to not show the Done modal
  const [open, setOpen] = useState(false);

  const closeWindow = () => {
    setOpen(true)
    setTimeout(() => {
      props.history.push('/resumeq/seekerpanel');
    }, 200)
  }

  // if (window.location.includes('rating')) {
  //   alert(window.location)
  // }

  //This sets the darkened overlay behind the modals
  useEffect(() => {
    if (open) {
      document.getElementById('iq-review-page').style.display = 'block';
    } else {
      document.getElementById('iq-review-page').style.display = 'none';
    }
  }, [open]);

  return (
    <div>
      <div id='iq-review-page' className={styles.overlay} onClick={closeWindow}></div>
      {open && <Modal closeWindow={closeWindow} />}
      <div className='review-page'>
        <h2>Rating & Review</h2>
        <hr />
        <p>Your review will help other job seekers find the best coach.</p>
        {console.log('props in reviewPage', props)}
        <ReviewForm location={props.location} history={props.history} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default ReviewPage;
