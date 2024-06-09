import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './supplier.reducer';

export const Supplier = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const supplierList = useAppSelector(state => state.supplier.entities);
  const loading = useAppSelector(state => state.supplier.loading);
  const totalItems = useAppSelector(state => state.supplier.totalItems);

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
      <h2 id="supplier-heading" data-cy="SupplierHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.home.title">Suppliers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/supplier/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.home.createLabel">Create new Supplier</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {supplierList && supplierList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('acronym')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.acronym">Acronym</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('acronym')} />
                </th>
                <th className="hand" onClick={sort('companyName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.companyName">Company Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('companyName')} />
                </th>
                <th className="hand" onClick={sort('streetAddress')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.streetAddress">Street Address</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('streetAddress')} />
                </th>
                <th className="hand" onClick={sort('houseNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.houseNumber">House Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('houseNumber')} />
                </th>
                <th className="hand" onClick={sort('locationName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.locationName">Location Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('locationName')} />
                </th>
                <th className="hand" onClick={sort('city')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.city">City</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('city')} />
                </th>
                <th className="hand" onClick={sort('stateProvince')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.stateProvince">State Province</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('stateProvince')} />
                </th>
                <th className="hand" onClick={sort('zipPostalCode')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.zipPostalCode">Zip Postal Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('zipPostalCode')} />
                </th>
                <th className="hand" onClick={sort('countryRegion')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.countryRegion">Country Region</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('countryRegion')} />
                </th>
                <th className="hand" onClick={sort('pointLocation')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.pointLocation">Point Location</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('pointLocation')} />
                </th>
                <th className="hand" onClick={sort('mainEmail')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.mainEmail">Main Email</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mainEmail')} />
                </th>
                <th className="hand" onClick={sort('phoneNumber1')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.phoneNumber1">Phone Number 1</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('phoneNumber1')} />
                </th>
                <th className="hand" onClick={sort('phoneNumber2')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.phoneNumber2">Phone Number 2</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('phoneNumber2')} />
                </th>
                <th className="hand" onClick={sort('customAttributesDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.customAttributesDetailsJSON">
                    Custom Attributes Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('customAttributesDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.activationStatus">Activation Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.representativePerson">Representative Person</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {supplierList.map((supplier, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/supplier/${supplier.id}`} color="link" size="sm">
                      {supplier.id}
                    </Button>
                  </td>
                  <td>{supplier.acronym}</td>
                  <td>{supplier.companyName}</td>
                  <td>{supplier.streetAddress}</td>
                  <td>{supplier.houseNumber}</td>
                  <td>{supplier.locationName}</td>
                  <td>{supplier.city}</td>
                  <td>{supplier.stateProvince}</td>
                  <td>{supplier.zipPostalCode}</td>
                  <td>{supplier.countryRegion}</td>
                  <td>
                    {supplier.pointLocation ? (
                      <div>
                        {supplier.pointLocationContentType ? (
                          <a onClick={openFile(supplier.pointLocationContentType, supplier.pointLocation)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {supplier.pointLocationContentType}, {byteSize(supplier.pointLocation)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{supplier.mainEmail}</td>
                  <td>{supplier.phoneNumber1}</td>
                  <td>{supplier.phoneNumber2}</td>
                  <td>{supplier.customAttributesDetailsJSON}</td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${supplier.activationStatus}`} />
                  </td>
                  <td>
                    {supplier.representativePerson ? (
                      <Link to={`/person/${supplier.representativePerson.id}`}>{supplier.representativePerson.lastname}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/supplier/${supplier.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/supplier/${supplier.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/supplier/${supplier.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.home.notFound">No Suppliers found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={supplierList && supplierList.length > 0 ? '' : 'd-none'}>
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

export default Supplier;
