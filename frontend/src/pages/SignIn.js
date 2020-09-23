import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

export default function SignIn() {
  return (
    <div className="auth__container">
      <h1>Sign In</h1>
      <form>
        <fieldset>
          <label>Mail</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Sign In"/>
        </fieldset>
        <p>No account yet? <Link className="redirect__link" to="/signup">Sign up</Link></p>
      </form>
    </div>
  )
}