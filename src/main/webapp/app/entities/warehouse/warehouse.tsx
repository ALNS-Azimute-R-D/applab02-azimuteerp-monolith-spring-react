import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './warehouse.reducer';

export const Warehouse = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const warehouseList = useAppSelector(state => state.warehouse.entities);
  const loading = useAppSelector(state => state.warehouse.loading);
  const totalItems = useAppSelector(state => state.warehouse.totalItems);

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
      <h2 id="warehouse-heading" data-cy="WarehouseHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.home.title">Warehouses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/warehouse/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.home.createLabel">Create new Warehouse</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {warehouseList && warehouseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('acronym')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.acronym">Acronym</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('acronym')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('streetAddress')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.streetAddress">Street Address</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('streetAddress')} />
                </th>
                <th className="hand" onClick={sort('houseNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.houseNumber">House Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('houseNumber')} />
                </th>
                <th className="hand" onClick={sort('locationName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.locationName">Location Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('locationName')} />
                </th>
                <th className="hand" onClick={sort('postalCode')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.postalCode">Postal Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('postalCode')} />
                </th>
                <th className="hand" onClick={sort('pointLocation')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.pointLocation">Point Location</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('pointLocation')} />
                </th>
                <th className="hand" onClick={sort('mainEmail')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.mainEmail">Main Email</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mainEmail')} />
                </th>
                <th className="hand" onClick={sort('landPhoneNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.landPhoneNumber">Land Phone Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('landPhoneNumber')} />
                </th>
                <th className="hand" onClick={sort('mobilePhoneNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.mobilePhoneNumber">Mobile Phone Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mobilePhoneNumber')} />
                </th>
                <th className="hand" onClick={sort('faxNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.faxNumber">Fax Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('faxNumber')} />
                </th>
                <th className="hand" onClick={sort('customAttributesDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.customAttributesDetailsJSON">
                    Custom Attributes Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('customAttributesDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.activationStatus">Activation Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {warehouseList.map((warehouse, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/warehouse/${warehouse.id}`} color="link" size="sm">
                      {warehouse.id}
                    </Button>
                  </td>
                  <td>{warehouse.acronym}</td>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.description}</td>
                  <td>{warehouse.streetAddress}</td>
                  <td>{warehouse.houseNumber}</td>
                  <td>{warehouse.locationName}</td>
                  <td>{warehouse.postalCode}</td>
                  <td>
                    {warehouse.pointLocation ? (
                      <div>
                        {warehouse.pointLocationContentType ? (
                          <a onClick={openFile(warehouse.pointLocationContentType, warehouse.pointLocation)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {warehouse.pointLocationContentType}, {byteSize(warehouse.pointLocation)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{warehouse.mainEmail}</td>
                  <td>{warehouse.landPhoneNumber}</td>
                  <td>{warehouse.mobilePhoneNumber}</td>
                  <td>{warehouse.faxNumber}</td>
                  <td>{warehouse.customAttributesDetailsJSON}</td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${warehouse.activationStatus}`} />
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/warehouse/${warehouse.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/warehouse/${warehouse.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/warehouse/${warehouse.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.home.notFound">No Warehouses found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={warehouseList && warehouseList.length > 0 ? '' : 'd-none'}>
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

export default Warehouse;
