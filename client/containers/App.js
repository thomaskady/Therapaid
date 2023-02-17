import React from 'react';
import { useState } from 'react';
import styles from '../styles/App.module.css';

import Login from '../components/Login';
import HomeContainer from './HomeContainer';
import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList';
import PatientList from '../components/PatientList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('TaskList');
  let ComponentToRender;

  if (currentPage === 'TaskList') {
    ComponentToRender = TaskList;
  } else if (currentPage === 'PatientList') {
    ComponentToRender = PatientList;
  }

  return (
    <div className={styles.container}>{isLoggedIn ? <HomeContainer><NavBar changePage={setCurrentPage}></NavBar><ComponentToRender></ComponentToRender></HomeContainer> : <Login setLogin={setIsLoggedIn}></Login>}</div>
  );
};

export default App;
