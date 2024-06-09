import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CommonLocality from './common-locality';
import CommonLocalityDetail from './common-locality-detail';
import CommonLocalityUpdate from './common-locality-update';
import CommonLocalityDeleteDialog from './common-locality-delete-dialog';

const CommonLocalityRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CommonLocality />} />
    <Route path="new" element={<CommonLocalityUpdate />} />
    <Route path=":id">
      <Route index element={<CommonLocalityDetail />} />
      <Route path="edit" element={<CommonLocalityUpdate />} />
      <Route path="delete" element={<CommonLocalityDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CommonLocalityRoutes;
