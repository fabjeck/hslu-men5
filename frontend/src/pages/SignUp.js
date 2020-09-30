import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

import FormValidation from '../components/FormValidation';
import Error from '../components/Error';

function validateUsername(value) {
  if (validator.isEmpty(value, { ignore_whitespace: true })) {
    return 'Username is required.';
  }
  if (!value.split(' ').every((word) => validator.isAlpha(word, 'de-DE'))) {
    return 'Username must only contain letters.';
  }
  return null;
}

function validateMail(value) {
  if (validator.isEmpty(value, { ignore_whitespace: true })) {
    return 'Mail is required.';
  }
  if (!validator.isEmail(value)) {
    return 'Invalid mail format.';
  }
  return null;
}

function validatePassword(value) {
  if (validator.isEmpty(value, { ignore_whitespace: true })) {
    return 'Password is required.';
  }
  if (!validator.isLength(value, { min: 8 })) {
    return 'Password must contain at least 8 characters.';
  }
  return null;
}

const initialValues = {
  username: '',
  mail: '',
  password: ''
};

const validate = {
  username: value => validateUsername(value),
  mail: value => validateMail(value),
  password: value => validatePassword(value)
}

function Form({ handleChange, handleBlur, handleSubmit, values, errors, serverError }) {
  return (
    <div className="auth__container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} autoComplete="on" noValidate>
        <fieldset>
          <label>Username</label>
          <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} autoComplete="username" />
          {(errors.username || serverError.username) && <Error text={errors.username || serverError.username} />}
        </fieldset>
        <fieldset>
          <label>Mail</label>
          <input type="email" name="mail" value={values.mail} onChange={handleChange} onBlur={handleBlur} autoComplete="email" />
          {errors.mail && <Error text={errors.mail} />}
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="new-password" />
          {errors.password && <Error text={errors.password} />}
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Sign Up" />
        </fieldset>
        <p>Already registered? <Link className="redirect__link" to="/signin">Sign in</Link></p>
      </form>
    </div>
  )

};

export default function SignUp() {

  const history = useHistory();

  async function createUser({ username, mail, password }) {
    await axios.post(
      'http://localhost:8080/user',
      JSON.stringify({
        username,
        mail,
        password
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    history.push('/');
  };

  return (
    <FormValidation initialValues={initialValues} validate={validate} submit={createUser}>
      <Form />
    </FormValidation>
  )
}