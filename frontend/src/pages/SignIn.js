import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import './SignIn.scss';

import useForm from '../helpers/useForm';
import userContext from '../helpers/userContext';
import Error from '../components/Error';

function validateUsername(username) {
  if (validator.isEmpty(username, { ignore_whitespace: true })) {
    return 'Username is required.';
  }
  return null;
}

function validatePassword(password) {
  if (validator.isEmpty(password, { ignore_whitespace: true })) {
    return 'Password is required.';
  }
  return null;
}

const initialValues = {
  username: '',
  password: ''
};

const validate = {
  username: username => validateUsername(username),
  password: username => validatePassword(username)
}

export default function SignIn() {

  const [authFailed, setAuthFailed] = useState(false);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm({
    initialValues,
    validate,
    onSubmit
  });

  const { login } = useContext(userContext);

  const history = useHistory();

  function authErrorAnimation() {
    setAuthFailed(true);
    setTimeout(() => {
      setAuthFailed(false);
    }, 500);
  };

  async function onSubmit() {
    const { username, password } = values;
    try {
      const { data } = await axios.post(
        'http://localhost:8080/users/signin',
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
      login(data);
      history.push('/');
    } catch (error) {
      if (error.response?.status === 401) {
        authErrorAnimation();
      }
      return error;
    }
  }

  return (
    <div className={`auth__container ${authFailed ? 'shake' : ''}`}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} autoComplete="on" noValidate>
        <fieldset>
          <label>Username</label>
          <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} autoComplete="username" />
          {(touched.username && errors.username) && <Error text={errors.username} />}
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="current-password" />
          {(touched.password && errors.password) && <Error text={errors.password} />}
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Sign In" />
        </fieldset>
        <p>No account yet? <Link className="redirect__link" to="/signup">Sign up</Link></p>
      </form>
    </div>
  )
}