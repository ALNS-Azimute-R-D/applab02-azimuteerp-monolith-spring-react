import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import RawAssetProcTmp from './raw-asset-proc-tmp';
import RawAssetProcTmpDetail from './raw-asset-proc-tmp-detail';
import RawAssetProcTmpUpdate from './raw-asset-proc-tmp-update';
import RawAssetProcTmpDeleteDialog from './raw-asset-proc-tmp-delete-dialog';

const RawAssetProcTmpRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<RawAssetProcTmp />} />
    <Route path="new" element={<RawAssetProcTmpUpdate />} />
    <Route path=":id">
      <Route index element={<RawAssetProcTmpDetail />} />
      <Route path="edit" element={<RawAssetProcTmpUpdate />} />
      <Route path="delete" element={<RawAssetProcTmpDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default RawAssetProcTmpRoutes;
