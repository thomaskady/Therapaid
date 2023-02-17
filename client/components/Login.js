import React from 'react';
import styles from '../styles/Login.module.css';
import { useState, useRef } from 'react';

const configurePostFetch = (methodType, bodyObj) => {
  return {method: methodType, headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(bodyObj)}
}

const Login = (props) => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [failedToLogin, setFailedToLogin] = useState(false);
  const userInput = useRef(null);
  const passInput = useRef(null);

  let headerText;
  let buttonText;
  let fetchMethod;

  if (isSigningIn) {
    headerText = 'LOGIN';
    buttonText = 'LOGIN';
    fetchMethod = 'GET';
  } else {
    headerText = 'SIGN UP';
    buttonText = 'SIGN UP';
    fetchMethod = 'POST';
  }

  const signUpHandler = () => {
    isSigningIn ? setIsSigningIn(false) : setIsSigningIn(true);
  };

  const signUpButtonHandler = async (event) => {
    event.preventDefault();
    const fetchOptions = configurePostFetch(fetchMethod, {username: userInput.current.value, password: passInput.current.value});
    const data = await fetch('api/users', fetchOptions);
    const userIsValid = await data.json();
    if (userIsValid) props.setLogin(true);
  };

  const loginButtonHandler = async (event) => {
    event.preventDefault();
    const data = await fetch(`api/users/${userInput.current.value}&${passInput.current.value}`);
    const userIsValid = await data.json();
    if (userIsValid) props.setLogin(true);
    else setFailedToLogin(true);
  }

  return (
    <form className={styles.formContainer}>
      <header className={styles.header}>
        <h2>{headerText}</h2>
      </header>
      <div className={styles.formInput}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" ref={userInput}></input>
        <br></br>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" ref={passInput}></input>
      </div>
      <button onClick={isSigningIn ? loginButtonHandler : signUpButtonHandler}>{buttonText}</button>
      {failedToLogin && <p className={styles.failureText}>Incorrect username or password. Please try again or create a new account.</p>}
      {isSigningIn ? (
        <p>
          Don't have an account? <a onClick={signUpHandler}>Sign up here</a>
        </p>
      ) : (
        <p>
          Already have an account? <a onClick={signUpHandler}>Login here</a>
        </p>
      )}
    </form>
  );
};

export default Login;
