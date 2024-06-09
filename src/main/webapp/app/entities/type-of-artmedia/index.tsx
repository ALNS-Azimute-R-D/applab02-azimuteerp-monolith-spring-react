import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TypeOfArtmedia from './type-of-artmedia';
import TypeOfArtmediaDetail from './type-of-artmedia-detail';
import TypeOfArtmediaUpdate from './type-of-artmedia-update';
import TypeOfArtmediaDeleteDialog from './type-of-artmedia-delete-dialog';

const TypeOfArtmediaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TypeOfArtmedia />} />
    <Route path="new" element={<TypeOfArtmediaUpdate />} />
    <Route path=":id">
      <Route index element={<TypeOfArtmediaDetail />} />
      <Route path="edit" element={<TypeOfArtmediaUpdate />} />
      <Route path="delete" element={<TypeOfArtmediaDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TypeOfArtmediaRoutes;
