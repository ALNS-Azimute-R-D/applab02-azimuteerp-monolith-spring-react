import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AssetCollection from './asset-collection';
import AssetCollectionDetail from './asset-collection-detail';
import AssetCollectionUpdate from './asset-collection-update';
import AssetCollectionDeleteDialog from './asset-collection-delete-dialog';

const AssetCollectionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AssetCollection />} />
    <Route path="new" element={<AssetCollectionUpdate />} />
    <Route path=":id">
      <Route index element={<AssetCollectionDetail />} />
      <Route path="edit" element={<AssetCollectionUpdate />} />
      <Route path="delete" element={<AssetCollectionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssetCollectionRoutes;
