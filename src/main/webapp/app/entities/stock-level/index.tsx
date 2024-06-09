import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import StockLevel from './stock-level';
import StockLevelDetail from './stock-level-detail';
import StockLevelUpdate from './stock-level-update';
import StockLevelDeleteDialog from './stock-level-delete-dialog';

const StockLevelRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<StockLevel />} />
    <Route path="new" element={<StockLevelUpdate />} />
    <Route path=":id">
      <Route index element={<StockLevelDetail />} />
      <Route path="edit" element={<StockLevelUpdate />} />
      <Route path="delete" element={<StockLevelDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StockLevelRoutes;
