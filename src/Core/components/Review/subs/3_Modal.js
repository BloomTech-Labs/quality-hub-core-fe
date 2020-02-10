import React from 'react';

import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';

import feedback from '../../../../global/icons/feedback.png';
import styles from './RQModal.module.scss';

const Modal = ({ closeModal }) => {
  // console.log(props);
  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={closeModal}>
          <Icon
            icon={ICONS.CLOSE}
            width={24}
            height={24}
            color='#757575'
          />
        </div>
        <img src={feedback} alt='feedback' />
        <h2 className={styles.h2}>Your feedback has been received!</h2>
        <p>Thanks for sharing your thoughts with us!
          Your feedback will remain anonymous and will be used to
          improve the InterviewQ experience for everyone.</p>
      </div>
    </div>
  )
}

export default Modal;
