import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TypeOfArtist from './type-of-artist';
import TypeOfArtistDetail from './type-of-artist-detail';
import TypeOfArtistUpdate from './type-of-artist-update';
import TypeOfArtistDeleteDialog from './type-of-artist-delete-dialog';

const TypeOfArtistRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TypeOfArtist />} />
    <Route path="new" element={<TypeOfArtistUpdate />} />
    <Route path=":id">
      <Route index element={<TypeOfArtistDetail />} />
      <Route path="edit" element={<TypeOfArtistUpdate />} />
      <Route path="delete" element={<TypeOfArtistDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TypeOfArtistRoutes;
