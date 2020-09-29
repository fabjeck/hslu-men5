import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import './Auth.scss';

export default function SignIn() {

  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    const { [name]: changedValue, ...rest } = values;

    setValues({
      ...rest,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
  };

  return (
    <div className="auth__container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} autoComplete="on" noValidate>
        <fieldset>
          <label>Username</label>
          <input type="text" name="username" value={values.username} onChange={handleChange} autoComplete="username" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} autoComplete="current-password" />
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Sign In" />
        </fieldset>
        <p>No account yet? <Link className="redirect__link" to="/signup">Sign up</Link></p>
      </form>
    </div>
  )
}