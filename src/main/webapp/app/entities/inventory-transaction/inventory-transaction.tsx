import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './inventory-transaction.reducer';

export const InventoryTransaction = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const inventoryTransactionList = useAppSelector(state => state.inventoryTransaction.entities);
  const loading = useAppSelector(state => state.inventoryTransaction.loading);
  const totalItems = useAppSelector(state => state.inventoryTransaction.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="inventory-transaction-heading" data-cy="InventoryTransactionHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.home.title">Inventory Transactions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/inventory-transaction/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.home.createLabel">
              Create new Inventory Transaction
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {inventoryTransactionList && inventoryTransactionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('invoiceId')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.invoiceId">Invoice Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('invoiceId')} />
                </th>
                <th className="hand" onClick={sort('transactionCreatedDate')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionCreatedDate">
                    Transaction Created Date
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('transactionCreatedDate')} />
                </th>
                <th className="hand" onClick={sort('transactionModifiedDate')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionModifiedDate">
                    Transaction Modified Date
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('transactionModifiedDate')} />
                </th>
                <th className="hand" onClick={sort('quantity')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.quantity">Quantity</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('quantity')} />
                </th>
                <th className="hand" onClick={sort('transactionComments')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionComments">
                    Transaction Comments
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('transactionComments')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.activationStatus">
                    Activation Status
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.supplier">Supplier</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.product">Product</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.warehouse">Warehouse</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {inventoryTransactionList.map((inventoryTransaction, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/inventory-transaction/${inventoryTransaction.id}`} color="link" size="sm">
                      {inventoryTransaction.id}
                    </Button>
                  </td>
                  <td>{inventoryTransaction.invoiceId}</td>
                  <td>
                    {inventoryTransaction.transactionCreatedDate ? (
                      <TextFormat type="date" value={inventoryTransaction.transactionCreatedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {inventoryTransaction.transactionModifiedDate ? (
                      <TextFormat type="date" value={inventoryTransaction.transactionModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{inventoryTransaction.quantity}</td>
                  <td>{inventoryTransaction.transactionComments}</td>
                  <td>
                    <Translate
                      contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${inventoryTransaction.activationStatus}`}
                    />
                  </td>
                  <td>
                    {inventoryTransaction.supplier ? (
                      <Link to={`/supplier/${inventoryTransaction.supplier.id}`}>{inventoryTransaction.supplier.acronym}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {inventoryTransaction.product ? (
                      <Link to={`/product/${inventoryTransaction.product.id}`}>{inventoryTransaction.product.productName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {inventoryTransaction.warehouse ? (
                      <Link to={`/warehouse/${inventoryTransaction.warehouse.id}`}>{inventoryTransaction.warehouse.acronym}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/inventory-transaction/${inventoryTransaction.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/inventory-transaction/${inventoryTransaction.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/inventory-transaction/${inventoryTransaction.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.home.notFound">
                No Inventory Transactions found
              </Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={inventoryTransactionList && inventoryTransactionList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default InventoryTransaction;
