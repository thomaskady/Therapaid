import React from 'react';
import styles from '../styles/Task.module.css';

const Task = (props) => {
  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const formatTime = (time) => {
    let afternoon = false;
    if ((time / 1200) > 1) {
      time = time % 1200;
      afternoon = true;
    }
    if (time === 1200) afternoon = true;
    const split = String(time).split('');
    if (split.length === 3) {
      split.splice(1, 0, ':');
    } else {
      split.splice(2, 0, ':');
    }
    const timeStr = split.join('');
    if (afternoon) return timeStr + ' pm';
    return timeStr + ' am';
  }

  return <li className={styles.listItem}><h2>{`${capitalizeFirstLetter(props.firstName)} ${capitalizeFirstLetter(props.lastName)}`}</h2><h3>{`${formatTime(props.startTime)} - ${formatTime(props.endTime)}`}</h3></li>
}

export default Task;