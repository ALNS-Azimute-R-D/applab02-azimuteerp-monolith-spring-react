import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import OrganizationMemberRole from './organization-member-role';
import OrganizationMemberRoleDetail from './organization-member-role-detail';
import OrganizationMemberRoleUpdate from './organization-member-role-update';
import OrganizationMemberRoleDeleteDialog from './organization-member-role-delete-dialog';

const OrganizationMemberRoleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<OrganizationMemberRole />} />
    <Route path="new" element={<OrganizationMemberRoleUpdate />} />
    <Route path=":id">
      <Route index element={<OrganizationMemberRoleDetail />} />
      <Route path="edit" element={<OrganizationMemberRoleUpdate />} />
      <Route path="delete" element={<OrganizationMemberRoleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OrganizationMemberRoleRoutes;
