import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import EventAttendee from './event-attendee';
import EventAttendeeDetail from './event-attendee-detail';
import EventAttendeeUpdate from './event-attendee-update';
import EventAttendeeDeleteDialog from './event-attendee-delete-dialog';

const EventAttendeeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<EventAttendee />} />
    <Route path="new" element={<EventAttendeeUpdate />} />
    <Route path=":id">
      <Route index element={<EventAttendeeDetail />} />
      <Route path="edit" element={<EventAttendeeUpdate />} />
      <Route path="delete" element={<EventAttendeeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EventAttendeeRoutes;
