import React from 'react';
import styles from '../styles/PatientList.module.css';
import { useEffect, useState } from 'react';
import Patient from './Patient';
import Modal from '../containers/Modal';
import NewPatientForm from './NewPatientForm';

const PatientList = () => {
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useModal, setUseModal] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await fetch('/api/patients');
      const fetchedPatientList = await data.json();
      setPatientList(fetchedPatientList);
      setIsLoading(false);
    };
    fetchPatients();
  }, []);

  const addButtonHandler = e => {
    setUseModal(true);
  }

  console.log(patientList);

  return (
    <div className={styles.listContainer}>
      {useModal && <Modal setModal={setUseModal}><NewPatientForm setModal={setUseModal} patientList={patientList} setPatientList={setPatientList}></NewPatientForm></Modal>}
      <button onClick={addButtonHandler}>Add New Patient</button>
      <ul className={styles.list}>{isLoading ? <p>Loading...</p> : patientList.map((patient) => {
        return <Patient firstName={patient.firstname} lastName={patient.lastname} id={patient._id} key={patient._id}></Patient>
      })}</ul>
    </div>
  );
};

export default PatientList;
