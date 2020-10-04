import React from 'react';
import { Route } from 'react-router-dom';

import Modal from '../../components/Modal';

export default function ModalRoute({ component: Component, ...rest }) {
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