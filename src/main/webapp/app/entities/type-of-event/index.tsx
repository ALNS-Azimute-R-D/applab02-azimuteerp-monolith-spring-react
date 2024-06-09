import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TypeOfEvent from './type-of-event';
import TypeOfEventDetail from './type-of-event-detail';
import TypeOfEventUpdate from './type-of-event-update';
import TypeOfEventDeleteDialog from './type-of-event-delete-dialog';

const TypeOfEventRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TypeOfEvent />} />
    <Route path="new" element={<TypeOfEventUpdate />} />
    <Route path=":id">
      <Route index element={<TypeOfEventDetail />} />
      <Route path="edit" element={<TypeOfEventUpdate />} />
      <Route path="delete" element={<TypeOfEventDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TypeOfEventRoutes;
