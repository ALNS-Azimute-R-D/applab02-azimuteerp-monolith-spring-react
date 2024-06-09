import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ArtworkCast from './artwork-cast';
import ArtworkCastDetail from './artwork-cast-detail';
import ArtworkCastUpdate from './artwork-cast-update';
import ArtworkCastDeleteDialog from './artwork-cast-delete-dialog';

const ArtworkCastRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ArtworkCast />} />
    <Route path="new" element={<ArtworkCastUpdate />} />
    <Route path=":id">
      <Route index element={<ArtworkCastDetail />} />
      <Route path="edit" element={<ArtworkCastUpdate />} />
      <Route path="delete" element={<ArtworkCastDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ArtworkCastRoutes;
