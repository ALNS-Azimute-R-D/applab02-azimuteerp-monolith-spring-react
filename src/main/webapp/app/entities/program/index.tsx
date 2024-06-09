import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Program from './program';
import ProgramDetail from './program-detail';
import ProgramUpdate from './program-update';
import ProgramDeleteDialog from './program-delete-dialog';

const ProgramRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Program />} />
    <Route path="new" element={<ProgramUpdate />} />
    <Route path=":id">
      <Route index element={<ProgramDetail />} />
      <Route path="edit" element={<ProgramUpdate />} />
      <Route path="delete" element={<ProgramDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProgramRoutes;
