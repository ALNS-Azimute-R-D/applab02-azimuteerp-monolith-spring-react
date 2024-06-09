import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TownCity from './town-city';
import TownCityDetail from './town-city-detail';
import TownCityUpdate from './town-city-update';
import TownCityDeleteDialog from './town-city-delete-dialog';

const TownCityRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TownCity />} />
    <Route path="new" element={<TownCityUpdate />} />
    <Route path=":id">
      <Route index element={<TownCityDetail />} />
      <Route path="edit" element={<TownCityUpdate />} />
      <Route path="delete" element={<TownCityDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TownCityRoutes;
