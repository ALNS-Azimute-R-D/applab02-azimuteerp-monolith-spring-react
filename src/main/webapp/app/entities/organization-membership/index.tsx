import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import OrganizationMembership from './organization-membership';
import OrganizationMembershipDetail from './organization-membership-detail';
import OrganizationMembershipUpdate from './organization-membership-update';
import OrganizationMembershipDeleteDialog from './organization-membership-delete-dialog';

const OrganizationMembershipRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<OrganizationMembership />} />
    <Route path="new" element={<OrganizationMembershipUpdate />} />
    <Route path=":id">
      <Route index element={<OrganizationMembershipDetail />} />
      <Route path="edit" element={<OrganizationMembershipUpdate />} />
      <Route path="delete" element={<OrganizationMembershipDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OrganizationMembershipRoutes;
