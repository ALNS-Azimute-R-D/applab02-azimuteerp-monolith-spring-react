import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TypeOfVenue from './type-of-venue';
import TypeOfVenueDetail from './type-of-venue-detail';
import TypeOfVenueUpdate from './type-of-venue-update';
import TypeOfVenueDeleteDialog from './type-of-venue-delete-dialog';

const TypeOfVenueRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TypeOfVenue />} />
    <Route path="new" element={<TypeOfVenueUpdate />} />
    <Route path=":id">
      <Route index element={<TypeOfVenueDetail />} />
      <Route path="edit" element={<TypeOfVenueUpdate />} />
      <Route path="delete" element={<TypeOfVenueDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TypeOfVenueRoutes;
