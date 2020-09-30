import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

import Auth from '../components/FormValidation';
import Error from '../components/Error';

function validateUsername(value) {
  if (validator.isEmpty(value, { ignore_whitespace: true })) {
    return 'Username is required.';
  }
  return null;
}

function validatePassword(value) {
  if (validator.isEmpty(value, { ignore_whitespace: true })) {
    return 'Password is required.';
  }
  return null;
}

const initialValues = {
  username: '',
  password: ''
};

const validate = {
  username: value => validateUsername(value),
  password: value => validatePassword(value)
}

function Form({ handleChange, handleBlur, handleSubmit, values, errors, serverError }) {

  return (
    <div className={`auth__container ${serverError.auth ? 'shake' : ''}`}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} autoComplete="on" noValidate>
        <fieldset>
          <label>Username</label>
          <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} autoComplete="username" />
          {errors.username && <Error text={errors.username} />}
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="current-password" />
          {errors.password && <Error text={errors.password} />}
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Sign In" />
        </fieldset>
        <p>No account yet? <Link className="redirect__link" to="/signup">Sign up</Link></p>
      </form>
    </div>
  )
}

export default function SignIn() {

  const history = useHistory();

  async function login({ username, password }) {
    await axios.post(
      'http://localhost:8080/user/signin',
      JSON.stringify({
        username,
        password
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    history.push('/');
  }

  return (
    <Auth initialValues={initialValues} validate={validate} submit={login}>
      <Form />
    </Auth>
  )
}