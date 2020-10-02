import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

import useForm from '../helpers/useForm';
import userContext from '../helpers/userContext';
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

export default function SignUp() {

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

  const [userExists, setUserExists] = useState('');

  const { login } = useContext(userContext);

  const history = useHistory();

  async function onSubmit() {
    const { username, mail, password } = values;
    try {
      const { data } = await axios.post(
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
      login(data.token);
      history.push('/');
    } catch (error) {
      if (error.response?.status === 409) {
        return setUserExists(error.response.data.message);
      }
      return error;
    }
  };

  return (
    <div className="auth__container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} autoComplete="on" noValidate>
        <fieldset>
          <label>Username</label>
          <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} autoComplete="username" />
          {(touched.username && errors.username) && <Error text={errors.username} />}
          {userExists && <Error text={userExists} />}
        </fieldset>
        <fieldset>
          <label>Mail</label>
          <input type="email" name="mail" value={values.mail} onChange={handleChange} onBlur={handleBlur} autoComplete="email" />
          {(touched.mail && errors.mail) && <Error text={errors.mail} />}
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="new-password" />
          {(touched.password && errors.password) && <Error text={errors.password} />}
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Sign Up" />
        </fieldset>
        <p>Already registered? <Link className="redirect__link" to="/signin">Sign in</Link></p>
      </form>
    </div>
  )
}