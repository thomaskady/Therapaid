import React from 'react';
import styles from '../styles/NewSessionForm.module.css';
import { useRef } from 'react';

const NewSessionForm = (props) => {
  const dateInput = useRef(null);
  const startTimeInput = useRef(null);
  const endTimeInput = useRef(null);

  const dateTrimmer = date => {
    const splitDate = date.split('/');
    for (let i = 0; i < splitDate.length; i++) {
      splitDate[i] = Number(splitDate[i]);
    }
    return splitDate.join('/');
  }

  const addClickHandler = async (e) => {
    e.preventDefault();
    const data = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_id: props.patientId,
        start_time: startTimeInput.current.value,
        end_time: endTimeInput.current.value,
        day: dateTrimmer(dateInput.current.value)
      }),
    });
    props.setModal(false);
  };

  return (
    <form className={styles.formContainer}>
      <header className={styles.header}>
        <h2>New Session</h2>
      </header>
      <div className={styles.formInput}>
        <label htmlFor="date">Date: </label>
        <input
          type="text"
          id="date"
          name="date"
          ref={dateInput}
          placeholder="mm/dd/yyyy"
        ></input>
        <br></br>
        <label htmlFor="startTime">Start Time: </label>
        <input
          type="text"
          id="startTime"
          name="startTime"
          ref={startTimeInput}
        ></input>
        <br></br>
        <label htmlFor="endTime">End Time: </label>
        <input
          type="text"
          id="endTime"
          name="endTime"
          ref={endTimeInput}
        ></input>
      </div>
      <button onClick={addClickHandler}>Add new session</button>
    </form>
  );
};

export default NewSessionForm;
