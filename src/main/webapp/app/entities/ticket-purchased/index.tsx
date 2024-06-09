import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TicketPurchased from './ticket-purchased';
import TicketPurchasedDetail from './ticket-purchased-detail';
import TicketPurchasedUpdate from './ticket-purchased-update';
import TicketPurchasedDeleteDialog from './ticket-purchased-delete-dialog';

const TicketPurchasedRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TicketPurchased />} />
    <Route path="new" element={<TicketPurchasedUpdate />} />
    <Route path=":id">
      <Route index element={<TicketPurchasedDetail />} />
      <Route path="edit" element={<TicketPurchasedUpdate />} />
      <Route path="delete" element={<TicketPurchasedDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TicketPurchasedRoutes;
