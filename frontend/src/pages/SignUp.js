import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import './Auth.scss';

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

export default function SignUp() {

  const [values, setValues] = useState({
    username: '',
    mail: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = {
    username: value => validateUsername(value),
    mail: value => validateMail(value),
    password: value => validatePassword(value)
  }

  function handleChange(event) {
    const { name, value } = event.target;

    const { [name]: changedValue, ...rest } = values;

    setValues({
      ...rest,
      [name]: value
    });
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    const { [name]: removedError, ...rest } = errors;

    const error = validate[name](value);

    setErrors({
      ...rest,
      ...(error && { [name]: error })
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        return {
          ...acc,
          ...(newError && { [key]: newError })
        };
      },
      {}
    )

    setErrors(errors);

    if (!Object.values(errors).length) {
      console.log('Go!');
    }
  };

  return (
    <div className="auth__container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} autoComplete="on" noValidate>
        <fieldset>
          <label>Username</label>
          <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} autoComplete="username" />
          {errors.username && <Error text={errors.username} />}
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
}