import React from 'react';
import styles from '../styles/HomeContainer.module.css'

const HomeContainer = (props) => {
  return <div className={styles.container}>{props.children}</div>
}

export default HomeContainer;