import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './organization-domain.reducer';

export const OrganizationDomain = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const organizationDomainList = useAppSelector(state => state.organizationDomain.entities);
  const loading = useAppSelector(state => state.organizationDomain.loading);
  const totalItems = useAppSelector(state => state.organizationDomain.totalItems);

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
      <h2 id="organization-domain-heading" data-cy="OrganizationDomainHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.home.title">Organization Domains</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/organization-domain/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.home.createLabel">
              Create new Organization Domain
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {organizationDomainList && organizationDomainList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('domainAcronym')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.domainAcronym">Domain Acronym</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('domainAcronym')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('isVerified')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.isVerified">Is Verified</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('isVerified')} />
                </th>
                <th className="hand" onClick={sort('businessHandlerClazz')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.businessHandlerClazz">
                    Business Handler Clazz
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('businessHandlerClazz')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.activationStatus">
                    Activation Status
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.organization">Organization</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {organizationDomainList.map((organizationDomain, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/organization-domain/${organizationDomain.id}`} color="link" size="sm">
                      {organizationDomain.id}
                    </Button>
                  </td>
                  <td>{organizationDomain.domainAcronym}</td>
                  <td>{organizationDomain.name}</td>
                  <td>{organizationDomain.isVerified ? 'true' : 'false'}</td>
                  <td>{organizationDomain.businessHandlerClazz}</td>
                  <td>
                    <Translate
                      contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${organizationDomain.activationStatus}`}
                    />
                  </td>
                  <td>
                    {organizationDomain.organization ? (
                      <Link to={`/organization/${organizationDomain.organization.id}`}>{organizationDomain.organization.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/organization-domain/${organizationDomain.id}`}
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
                        to={`/organization-domain/${organizationDomain.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/organization-domain/${organizationDomain.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.home.notFound">
                No Organization Domains found
              </Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={organizationDomainList && organizationDomainList.length > 0 ? '' : 'd-none'}>
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

export default OrganizationDomain;
