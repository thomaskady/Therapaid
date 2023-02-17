import React from 'react';
import styles from '../styles/TaskList.module.css';
import { useEffect, useState } from 'react';

import Task from './Task';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAY_COUNT = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

const TaskList = () => {
  const [sessionsList, setSessionsList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const Today = new Date();
  const [day, setDay] = useState(Today.getDate());
  const [month, setMonth] = useState(Today.getMonth() + 1);
  const [year, setYear] = useState(Today.getFullYear());

  useEffect(() => {
    const fetchSessions = async () => {
      const data = await fetch(`/api/sessions/${month}&${day}&${year}`);
      const newSessionsList = await data.json();
      setSessionsList(newSessionsList);
      setIsLoading(false);
    };
    fetchSessions();
  }, [day]);

  console.log(sessionsList);

  const nextButtonHandler = (event) => {
    setIsLoading(true);
    let currentDay = day;
    let currentMonth = month;
    let currentYear = year;
    if (currentDay + 1 > DAY_COUNT[MONTHS[currentMonth - 1]]) {
      currentDay = 1;
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    } else currentDay++;
    setDay(currentDay);
    setMonth(currentMonth);
    setYear(currentYear);
  };

  const prevButtonHandler = (event) => {
    setIsLoading(true);
    let currentDay = day;
    let currentMonth = month;
    let currentYear = year;
    if (currentDay - 1 === 0) {
      currentMonth--;
      if (currentMonth === 0) {
        currentMonth = 12;
        currentYear--;
      }
      currentDay = DAY_COUNT[MONTHS[currentMonth - 1]];
    } else currentDay--;
    setDay(currentDay);
    setMonth(currentMonth);
    setYear(currentYear);
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.dateHeader}>
        <button onClick={prevButtonHandler}>Previous</button>
        <h1>{`${MONTHS[month - 1]} ${day}, ${year}`}</h1>
        <button onClick={nextButtonHandler}>Next</button>
      </div>
      <ol className={styles.list}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          sessionsList.map((session) => {
            return (
              <Task
                firstName={session.firstname}
                lastName={session.lastname}
                startTime={session.start_time}
                endTime={session.end_time}
                key={session._id}
              ></Task>
            );
          })
        )}
      </ol>
    </div>
  );
};

export default TaskList;
