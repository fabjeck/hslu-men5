import React from 'react';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.scss';

import Home from './components/home/Home';
import Login from './components/login/Login';


function App() {
  return (
    <div className="App">
      <header>
      <Link className="logo" to="/">Gallery</Link>
        <div className="auth">
          <Link to="/login">Login</Link>
        </div>
      </header>
      <main>
      <Switch>
      <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </main>
      <footer>
        <strong>Fabien Jeckelmann</strong> | BSc in Digital Ideation | Hochschule Luzern
      </footer>
    </div>
  );
}

export default App;
