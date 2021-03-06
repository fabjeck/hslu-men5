import React from 'react';
import axios from 'axios';
import './App.scss';

import Router from './router/Router';

import userContext from './helpers/userContext';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    this.secretTokenRefresh();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTokenTimer);
  }

  refreshTokenTimer(tokenExpiry) {
    setTimeout(() => {
      this.secretTokenRefresh();
    }, tokenExpiry * 1000);
  }

  async secretTokenRefresh() {
    try {
      const { data } = await axios.get('http://localhost:8080/refresh-token', { withCredentials: true });
      this.login(data.token, data.tokenExpiry);
    } catch (error) {
      this.logout();
      return error;
    }
  }

  login({user, token, tokenExpiry}) {
    this.setState({
      user: {
        ...user,
        token
      }
    });
    this.refreshTokenTimer(tokenExpiry);
  }

  logout() {
    this.setState({ user: {} });
    clearTimeout(this.refreshTokenTimer);
  }

  edit({mail, image}) {
    this.setState({
      user: {
        ...this.state.user,
        mail,
        image
      }
    });
  }


  render() {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout,
      edit: this.edit
    }
    return (
      <userContext.Provider value={context}>
        <div className="App">
          <Router />
        </div>
      </userContext.Provider>
    );
  }
}
