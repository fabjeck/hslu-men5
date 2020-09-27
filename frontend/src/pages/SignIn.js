import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

// import { validateUsername, validatePassword } from '../helpers/formValidation';

// const validate = {
//   username: value => validateUsername(value),
//   password: value => validatePassword(value)
// }

export default function SignIn() {
  return (
    <div className="auth__container">
      <h1>Sign In</h1>
      <form noValidate>
        <fieldset>
          <label>Username</label>
          <input type="text" required />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="password" required />
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Sign In"/>
        </fieldset>
        <p>No account yet? <Link className="redirect__link" to="/signup">Sign up</Link></p>
      </form>
    </div>
  )
}