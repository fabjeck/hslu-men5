import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import userContext from '../../helpers/userContext';

export default function PublicRoute({ children, ...rest }) {
  const { user } = useContext(userContext);
  const isLoggedOut = Object.keys(user).length === 0;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedOut ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}