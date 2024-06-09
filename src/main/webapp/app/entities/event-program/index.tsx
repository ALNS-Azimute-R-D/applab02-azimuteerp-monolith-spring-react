import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import EventProgram from './event-program';
import EventProgramDetail from './event-program-detail';
import EventProgramUpdate from './event-program-update';
import EventProgramDeleteDialog from './event-program-delete-dialog';

const EventProgramRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<EventProgram />} />
    <Route path="new" element={<EventProgramUpdate />} />
    <Route path=":id">
      <Route index element={<EventProgramDetail />} />
      <Route path="edit" element={<EventProgramUpdate />} />
      <Route path="delete" element={<EventProgramDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EventProgramRoutes;
