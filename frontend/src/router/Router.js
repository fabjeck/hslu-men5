import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import FullscreenRoutes from './FullscreenRoutes';

export default function Router() {
  return (
    <BrowserRouter>
      <FullscreenRoutes />
    </BrowserRouter>
  )
};