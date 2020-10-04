import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './App.scss';

import Router from './router/Router';

import userContext from './helpers/userContext';
import history from './router/history';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
    }, tokenExpiry);
  }

  async secretTokenRefresh() {
    try {
      const { data } = await axios.post('http://localhost:8080/refresh-token', { withCredentials: true });
      this.login(data.token, data.tokenExpiry);
    } catch (error) {
      if (error.response?.status === 401) {
        return history.push('/signin');
      }
      if (error.response?.status === 403) {
        return;
      }
      return error;
    }
  }

  login(token, tokenExpiry) {
    const { userID, username, image } = jwt_decode(token);
    this.setState({
      user: {
        userID,
        username,
        image,
        token
      }
    });
    this.refreshTokenTimer(tokenExpiry);
  }

  logout() {
    this.setState({ user: {} });
    clearTimeout(this.refreshTokenTimer);
  }


  render() {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
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
