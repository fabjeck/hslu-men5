import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

import Button from '../components/Button';

export default function SignUp() {
  return (
    <div className="auth__container">
      <h1>Sign up</h1>
      <form>
        <label>First name</label>
        <input className="form__element" type="text" />
        <label>Last name</label>
        <input className="form__element" type="text" />
        <label>Mail</label>
        <input className="form__element" type="text" />
        <label>Password</label>
        <input className="form__element" type="text" />
        <Button />
        <p>Already registered? <Link className="redirect__link" to="/signin">Sign in</Link></p>
      </form>
    </div>
  )
}