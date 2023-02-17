import React from 'react';
import styles from '../styles/Patient.module.css';
import { useState, Fragment } from 'react';
import Modal from '../containers/Modal';
import NewSessionForm from './NewSessionForm';

const Patient = (props) => {
  const [useModal, setUseModal] = useState(false);
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const addButtonHandler = e => {
    setUseModal(true);
  }

  return (
    <Fragment>
      {useModal && <Modal><NewSessionForm patientId={props.id} setModal={setUseModal}></NewSessionForm></Modal>}
      <li className={styles.listItem}>
        <h2>{`${capitalizeFirstLetter(props.firstName)} ${capitalizeFirstLetter(
          props.lastName
        )}`}</h2>
        <button onClick={addButtonHandler}>Add Session</button>
      </li>
    </Fragment>
  );
};

export default Patient;
