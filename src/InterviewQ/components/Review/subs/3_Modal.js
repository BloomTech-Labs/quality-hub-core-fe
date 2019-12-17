import React from 'react';

import styles from './Modal.module.scss';

const Modal = (props) => {
  return (
    <div className={styles.modal}>
      Im supposed to be a modal
      <p onClick={props.closeWindow}>Click me to close this damn window</p>
    </div>
  )
}

export default Modal;