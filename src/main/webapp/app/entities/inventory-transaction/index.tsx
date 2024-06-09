import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import InventoryTransaction from './inventory-transaction';
import InventoryTransactionDetail from './inventory-transaction-detail';
import InventoryTransactionUpdate from './inventory-transaction-update';
import InventoryTransactionDeleteDialog from './inventory-transaction-delete-dialog';

const InventoryTransactionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<InventoryTransaction />} />
    <Route path="new" element={<InventoryTransactionUpdate />} />
    <Route path=":id">
      <Route index element={<InventoryTransactionDetail />} />
      <Route path="edit" element={<InventoryTransactionUpdate />} />
      <Route path="delete" element={<InventoryTransactionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default InventoryTransactionRoutes;
