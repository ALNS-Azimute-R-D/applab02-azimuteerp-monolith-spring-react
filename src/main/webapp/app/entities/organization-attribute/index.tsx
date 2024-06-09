import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import OrganizationAttribute from './organization-attribute';
import OrganizationAttributeDetail from './organization-attribute-detail';
import OrganizationAttributeUpdate from './organization-attribute-update';
import OrganizationAttributeDeleteDialog from './organization-attribute-delete-dialog';

const OrganizationAttributeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<OrganizationAttribute />} />
    <Route path="new" element={<OrganizationAttributeUpdate />} />
    <Route path=":id">
      <Route index element={<OrganizationAttributeDetail />} />
      <Route path="edit" element={<OrganizationAttributeUpdate />} />
      <Route path="delete" element={<OrganizationAttributeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OrganizationAttributeRoutes;
