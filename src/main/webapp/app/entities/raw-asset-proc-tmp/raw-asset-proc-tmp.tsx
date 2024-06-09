import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './raw-asset-proc-tmp.reducer';

export const RawAssetProcTmp = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const rawAssetProcTmpList = useAppSelector(state => state.rawAssetProcTmp.entities);
  const loading = useAppSelector(state => state.rawAssetProcTmp.loading);
  const totalItems = useAppSelector(state => state.rawAssetProcTmp.totalItems);

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
      <h2 id="raw-asset-proc-tmp-heading" data-cy="RawAssetProcTmpHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.home.title">Raw Asset Proc Tmps</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/raw-asset-proc-tmp/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.home.createLabel">
              Create new Raw Asset Proc Tmp
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {rawAssetProcTmpList && rawAssetProcTmpList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('statusRawProcessing')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.statusRawProcessing">
                    Status Raw Processing
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('statusRawProcessing')} />
                </th>
                <th className="hand" onClick={sort('fullFilenamePath')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.fullFilenamePath">Full Filename Path</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('fullFilenamePath')} />
                </th>
                <th className="hand" onClick={sort('assetRawContentAsBlob')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.assetRawContentAsBlob">
                    Asset Raw Content As Blob
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('assetRawContentAsBlob')} />
                </th>
                <th className="hand" onClick={sort('customAttributesDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.customAttributesDetailsJSON">
                    Custom Attributes Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('customAttributesDetailsJSON')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.assetType">Asset Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rawAssetProcTmpList.map((rawAssetProcTmp, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/raw-asset-proc-tmp/${rawAssetProcTmp.id}`} color="link" size="sm">
                      {rawAssetProcTmp.id}
                    </Button>
                  </td>
                  <td>{rawAssetProcTmp.name}</td>
                  <td>
                    <Translate
                      contentKey={`azimuteErpSpringReactMonolith03App.StatusRawProcessingEnum.${rawAssetProcTmp.statusRawProcessing}`}
                    />
                  </td>
                  <td>{rawAssetProcTmp.fullFilenamePath}</td>
                  <td>
                    {rawAssetProcTmp.assetRawContentAsBlob ? (
                      <div>
                        {rawAssetProcTmp.assetRawContentAsBlobContentType ? (
                          <a onClick={openFile(rawAssetProcTmp.assetRawContentAsBlobContentType, rawAssetProcTmp.assetRawContentAsBlob)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {rawAssetProcTmp.assetRawContentAsBlobContentType}, {byteSize(rawAssetProcTmp.assetRawContentAsBlob)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{rawAssetProcTmp.customAttributesDetailsJSON}</td>
                  <td>
                    {rawAssetProcTmp.assetType ? (
                      <Link to={`/asset-type/${rawAssetProcTmp.assetType.id}`}>{rawAssetProcTmp.assetType.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/raw-asset-proc-tmp/${rawAssetProcTmp.id}`}
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
                        to={`/raw-asset-proc-tmp/${rawAssetProcTmp.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/raw-asset-proc-tmp/${rawAssetProcTmp.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.home.notFound">
                No Raw Asset Proc Tmps found
              </Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={rawAssetProcTmpList && rawAssetProcTmpList.length > 0 ? '' : 'd-none'}>
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

export default RawAssetProcTmp;
