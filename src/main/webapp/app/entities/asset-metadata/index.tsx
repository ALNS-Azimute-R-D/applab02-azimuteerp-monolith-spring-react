import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AssetMetadata from './asset-metadata';
import AssetMetadataDetail from './asset-metadata-detail';
import AssetMetadataUpdate from './asset-metadata-update';
import AssetMetadataDeleteDialog from './asset-metadata-delete-dialog';

const AssetMetadataRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AssetMetadata />} />
    <Route path="new" element={<AssetMetadataUpdate />} />
    <Route path=":id">
      <Route index element={<AssetMetadataDetail />} />
      <Route path="edit" element={<AssetMetadataUpdate />} />
      <Route path="delete" element={<AssetMetadataDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssetMetadataRoutes;
