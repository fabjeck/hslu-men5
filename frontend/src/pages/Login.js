import React from 'react';
import './Login.scss';

export default class Login extends React.Component {
  render() {
    return (
      <div className="login__wrapper flex-stretch">
        <div className="login__box">
          <h1>Login</h1>
          <form>
            <label>Username</label>
            <input />
            <label>Password</label>
            <input />
          </form>
        </div>
      </div>
    )
  }
}