import React from 'react';
import styles from '../styles/NavBar.module.css';

const NavBar = (props) => {

  const patientsClickHandler = e => {
    props.changePage('PatientList');
  }

  const homeClickHandler = e => {
    props.changePage('TaskList');
  }

  return (
    <nav className={styles.navBar}>
        <div onClick={homeClickHandler}>Home</div>
        <div onClick={patientsClickHandler}>Patients</div>
    </nav>
  );
};

export default NavBar;
