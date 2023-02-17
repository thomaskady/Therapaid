import React from 'react';
import styles from '../styles/NewPatientForm.module.css';
import { useRef } from 'react';

const NewPatientForm = (props) => {
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);

  const addClickHandler = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({firstName : firstNameInput.current.value, lastName : lastNameInput.current.value}),
    });
    const newPatient = await res.json();
    console.log(newPatient);
    props.setModal(false);
    props.setPatientList([...props.patientList, newPatient]);
  };

  return (
    <form className={styles.formContainer}>
      <header className={styles.header}>
        <h2>New Patient</h2>
      </header>
      <div className={styles.formInput}>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          ref={firstNameInput}
        ></input>
        <br></br>
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          ref={lastNameInput}
        ></input>
      </div>
      <button onClick={addClickHandler}>Add new patient</button>
    </form>
  );
};

export default NewPatientForm;
