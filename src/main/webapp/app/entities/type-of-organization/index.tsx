import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TypeOfOrganization from './type-of-organization';
import TypeOfOrganizationDetail from './type-of-organization-detail';
import TypeOfOrganizationUpdate from './type-of-organization-update';
import TypeOfOrganizationDeleteDialog from './type-of-organization-delete-dialog';

const TypeOfOrganizationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TypeOfOrganization />} />
    <Route path="new" element={<TypeOfOrganizationUpdate />} />
    <Route path=":id">
      <Route index element={<TypeOfOrganizationDetail />} />
      <Route path="edit" element={<TypeOfOrganizationUpdate />} />
      <Route path="delete" element={<TypeOfOrganizationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TypeOfOrganizationRoutes;
