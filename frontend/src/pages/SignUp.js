import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

import Error from '../components/Error';

import { validateUsername, validateMail, validatePassword } from '../helpers/formValidation';

const validate = {
  username: value => validateUsername(value),
  mail: value => validateMail(value),
  password: value => validatePassword(value)
}

export default function SignUp() {

  const [values, setValues] = useState({
    username: '',
    mail: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    const { [name]: changedValue, ...rest } = values;

    setValues({
      ...rest,
      [name]: value
    });
  }

  const handleBlur = (event) => {
    const { name, value } = event.target;

    const { [name]: removedError, ...rest } = errors;

    const error = validate[name](value);

    setErrors({
      ...rest,
      ...(error && { [name]: error })
    });
  }

  const handleSubmit = (event) => {
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

    if(!Object.values(errors).length) {
      console.log('Go!');
    }
  };

  return (
    <div className="auth__container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} autoComplete="on">
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