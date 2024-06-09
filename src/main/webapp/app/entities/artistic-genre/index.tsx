import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ArtisticGenre from './artistic-genre';
import ArtisticGenreDetail from './artistic-genre-detail';
import ArtisticGenreUpdate from './artistic-genre-update';
import ArtisticGenreDeleteDialog from './artistic-genre-delete-dialog';

const ArtisticGenreRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ArtisticGenre />} />
    <Route path="new" element={<ArtisticGenreUpdate />} />
    <Route path=":id">
      <Route index element={<ArtisticGenreDetail />} />
      <Route path="edit" element={<ArtisticGenreUpdate />} />
      <Route path="delete" element={<ArtisticGenreDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ArtisticGenreRoutes;
