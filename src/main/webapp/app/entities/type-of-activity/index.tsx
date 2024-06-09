import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TypeOfActivity from './type-of-activity';
import TypeOfActivityDetail from './type-of-activity-detail';
import TypeOfActivityUpdate from './type-of-activity-update';
import TypeOfActivityDeleteDialog from './type-of-activity-delete-dialog';

const TypeOfActivityRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TypeOfActivity />} />
    <Route path="new" element={<TypeOfActivityUpdate />} />
    <Route path=":id">
      <Route index element={<TypeOfActivityDetail />} />
      <Route path="edit" element={<TypeOfActivityUpdate />} />
      <Route path="delete" element={<TypeOfActivityDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TypeOfActivityRoutes;
