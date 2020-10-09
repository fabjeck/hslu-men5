import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import userContext from '../../helpers/userContext';

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(userContext);
  const isLoggedIn = Object.keys(user).length !== 0;

  return (
    <Route
      {...rest}
      render={({ location }) =>
      isLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}