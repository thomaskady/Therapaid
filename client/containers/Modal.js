import React from 'react';
import styles from '../styles/Modal.module.css'

const Modal = props => {

  const clickHandler = e => {
    if (e.target.id === 'modal') props.setModal(false);
  }

  return <div id='modal' className={styles.modal} onClick={clickHandler}>{props.children}</div>
}

export default Modal;