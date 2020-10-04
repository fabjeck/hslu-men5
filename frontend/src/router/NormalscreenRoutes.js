import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';

import ModalRoute from './templates/ModalRoute';

import Home from '../pages/Home';
import ImageDetail from '../pages/ImageDetail';
import Publisher from '../pages/Publisher';
import NoMatch from '../pages/NoMatch';

export default function Routes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <React.Fragment>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route exact path="/images/:image" component={ImageDetail} />
        <Redirect from="/images" to="/" />
        <Route exact path="/:publisher" component={Publisher} />
        <Route path="*" component={NoMatch} />
      </Switch>
      {background && <ModalRoute path="/images/:image" component={ImageDetail} />}
    </React.Fragment>
  )
}