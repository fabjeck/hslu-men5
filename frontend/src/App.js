import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation
} from 'react-router-dom';
import './App.scss';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import ImageDetail from './pages/ImageDetail';
import Publisher from './pages/Publisher';

import Modal from './components/Modal';

function Routes() {
  console.log();
  const location = useLocation();
  const background = location.state?.background;

  return (
    <React.Fragment>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/images/:image" component={ImageDetail} />
        <Redirect from="/images" to="/" />
        <Route path="/:publisher" component={Publisher} />
        <Route path="*" component={NoMatch} />
      </Switch>
  {background && <Route path="/images/:image" children={<Modal component={<ImageDetail/>} />} />}
    </React.Fragment>
  )
}

export default function App() {
  return (
    <div className="App">
      <header>
        <Link className="logo" to="/">Gallery</Link>
        <div className="auth-info__container">
          <Link to="/login">Login</Link>
        </div>
      </header>
      <main className="flex-stretch">
        <Routes />
      </main>
      <footer>
        <strong>Fabien Jeckelmann</strong> | BSc in Digital Ideation | Hochschule Luzern
      </footer>
    </div>
  );
}
