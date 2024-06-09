import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './tenant.reducer';

export const Tenant = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const tenantList = useAppSelector(state => state.tenant.entities);
  const loading = useAppSelector(state => state.tenant.loading);
  const totalItems = useAppSelector(state => state.tenant.totalItems);

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
      <h2 id="tenant-heading" data-cy="TenantHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.home.title">Tenants</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/tenant/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.home.createLabel">Create new Tenant</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tenantList && tenantList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('acronym')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.acronym">Acronym</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('acronym')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('customerBusinessCode')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.customerBusinessCode">Customer Business Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('customerBusinessCode')} />
                </th>
                <th className="hand" onClick={sort('businessHandlerClazz')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.businessHandlerClazz">Business Handler Clazz</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('businessHandlerClazz')} />
                </th>
                <th className="hand" onClick={sort('mainContactPersonDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.mainContactPersonDetailsJSON">
                    Main Contact Person Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mainContactPersonDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('billingDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.billingDetailsJSON">Billing Details JSON</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('billingDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('technicalEnvironmentsDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.technicalEnvironmentsDetailsJSON">
                    Technical Environments Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('technicalEnvironmentsDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('customAttributesDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.customAttributesDetailsJSON">
                    Custom Attributes Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('customAttributesDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('logoImg')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.logoImg">Logo Img</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('logoImg')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.activationStatus">Activation Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tenantList.map((tenant, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/tenant/${tenant.id}`} color="link" size="sm">
                      {tenant.id}
                    </Button>
                  </td>
                  <td>{tenant.acronym}</td>
                  <td>{tenant.name}</td>
                  <td>{tenant.description}</td>
                  <td>{tenant.customerBusinessCode}</td>
                  <td>{tenant.businessHandlerClazz}</td>
                  <td>{tenant.mainContactPersonDetailsJSON}</td>
                  <td>{tenant.billingDetailsJSON}</td>
                  <td>{tenant.technicalEnvironmentsDetailsJSON}</td>
                  <td>{tenant.customAttributesDetailsJSON}</td>
                  <td>
                    {tenant.logoImg ? (
                      <div>
                        {tenant.logoImgContentType ? (
                          <a onClick={openFile(tenant.logoImgContentType, tenant.logoImg)}>
                            <img src={`data:${tenant.logoImgContentType};base64,${tenant.logoImg}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {tenant.logoImgContentType}, {byteSize(tenant.logoImg)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${tenant.activationStatus}`} />
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/tenant/${tenant.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/tenant/${tenant.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/tenant/${tenant.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.home.notFound">No Tenants found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={tenantList && tenantList.length > 0 ? '' : 'd-none'}>
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

export default Tenant;
