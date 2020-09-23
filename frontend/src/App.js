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
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NoMatch from './pages/NoMatch';
import ImageDetail from './pages/ImageDetail';
import Publisher from './pages/Publisher';

import Modal from './components/Modal';

function ModalRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={routeProps => (
        <Modal>
          <Component {...routeProps} />
        </Modal>
      )}
    />
  );
}

function Routes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <React.Fragment>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/images/:image" component={ImageDetail} />
        <Redirect from="/images" to="/" />
        <Route path="/:publisher" component={Publisher} />
        <Route path="*" component={NoMatch} />
      </Switch>
      {background && <ModalRoute path="/images/:image" component={ImageDetail} />}
    </React.Fragment>
  )
}

function Skeleton() {
  return (
    <React.Fragment>
      <header>
        <div className="logo__wrapper">
          <Link className="logo" to="/">Gallery</Link>
        </div>
        <ul className="nav__container">
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </header>
      <main>
        <Routes />
      </main>
      <footer>
        <strong>Fabien Jeckelmann</strong> | BSc in Digital Ideation | Hochschule Luzern
      </footer>
    </React.Fragment>
  )
}

function FullscreenRoutes() {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route component={Skeleton} />
    </Switch>
  )
}

export default function App() {
  return (
    <div className="App">
      <FullscreenRoutes />
    </div>
  );
}
