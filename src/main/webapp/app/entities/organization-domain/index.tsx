import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import OrganizationDomain from './organization-domain';
import OrganizationDomainDetail from './organization-domain-detail';
import OrganizationDomainUpdate from './organization-domain-update';
import OrganizationDomainDeleteDialog from './organization-domain-delete-dialog';

const OrganizationDomainRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<OrganizationDomain />} />
    <Route path="new" element={<OrganizationDomainUpdate />} />
    <Route path=":id">
      <Route index element={<OrganizationDomainDetail />} />
      <Route path="edit" element={<OrganizationDomainUpdate />} />
      <Route path="delete" element={<OrganizationDomainDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OrganizationDomainRoutes;
