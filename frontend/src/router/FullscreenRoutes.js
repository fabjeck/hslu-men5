import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PublicRoute from './templates/PublicRoute';
import Skeleton from './Skeleton';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default function FullscreenRoutes() {
  return (
    <Switch>
      <PublicRoute exact path="/signup">
        <SignUp />
      </PublicRoute>
      <PublicRoute exact path="/signin">
        <SignIn />
      </PublicRoute>
      <Route component={Skeleton} />
    </Switch>
  )
}