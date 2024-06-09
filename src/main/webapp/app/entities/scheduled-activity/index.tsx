import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ScheduledActivity from './scheduled-activity';
import ScheduledActivityDetail from './scheduled-activity-detail';
import ScheduledActivityUpdate from './scheduled-activity-update';
import ScheduledActivityDeleteDialog from './scheduled-activity-delete-dialog';

const ScheduledActivityRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ScheduledActivity />} />
    <Route path="new" element={<ScheduledActivityUpdate />} />
    <Route path=":id">
      <Route index element={<ScheduledActivityDetail />} />
      <Route path="edit" element={<ScheduledActivityUpdate />} />
      <Route path="delete" element={<ScheduledActivityDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ScheduledActivityRoutes;
