import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import OrganizationRole from './organization-role';
import OrganizationRoleDetail from './organization-role-detail';
import OrganizationRoleUpdate from './organization-role-update';
import OrganizationRoleDeleteDialog from './organization-role-delete-dialog';

const OrganizationRoleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<OrganizationRole />} />
    <Route path="new" element={<OrganizationRoleUpdate />} />
    <Route path=":id">
      <Route index element={<OrganizationRoleDetail />} />
      <Route path="edit" element={<OrganizationRoleUpdate />} />
      <Route path="delete" element={<OrganizationRoleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OrganizationRoleRoutes;
