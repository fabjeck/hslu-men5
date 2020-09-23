import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

export default function SignUp() {
  return (
    <div className="auth__container">
      <h1>Sign up</h1>
      <form>
        <fieldset>
          <label>First name</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <label>Last name</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <label>Mail</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Sign Up"/>
        </fieldset>
        <p>Already registered? <Link className="redirect__link" to="/signin">Sign in</Link></p>
      </form>
    </div>
  )
}