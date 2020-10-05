import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PublicRoute from './templates/PublicRoute';
import PrivateRoute from './templates/PrivateRoute';
import Skeleton from './Skeleton';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UserEdit from '../pages/UserEdit';

export default function FullscreenRoutes() {
  return (
    <Switch>
      <PublicRoute exact path="/signup">
        <SignUp />
      </PublicRoute>
      <PublicRoute exact path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute exact path="/edit/:publisher">
        <UserEdit />
      </PrivateRoute>
      <Route component={Skeleton} />
    </Switch>
  )
}