import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

import Button from '../components/Button';

export default function SignIn() {
  return (
    <div className="auth__container">
      <h1>Sign in</h1>
      <form>
        <label>Mail</label>
        <input className="form__element" type="text" />
        <label>Password</label>
        <input className="form__element" type="text" />
        <Button />
        <p>No account yet? <Link className="redirect__link" to="/signup">Sign up</Link></p>
      </form>
    </div>
  )
}