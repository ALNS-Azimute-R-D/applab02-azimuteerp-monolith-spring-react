import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TypeOfPerson from './type-of-person';
import TypeOfPersonDetail from './type-of-person-detail';
import TypeOfPersonUpdate from './type-of-person-update';
import TypeOfPersonDeleteDialog from './type-of-person-delete-dialog';

const TypeOfPersonRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TypeOfPerson />} />
    <Route path="new" element={<TypeOfPersonUpdate />} />
    <Route path=":id">
      <Route index element={<TypeOfPersonDetail />} />
      <Route path="edit" element={<TypeOfPersonUpdate />} />
      <Route path="delete" element={<TypeOfPersonDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TypeOfPersonRoutes;
