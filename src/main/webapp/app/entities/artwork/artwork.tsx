import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './artwork.reducer';

export const Artwork = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const artworkList = useAppSelector(state => state.artwork.entities);
  const loading = useAppSelector(state => state.artwork.loading);
  const totalItems = useAppSelector(state => state.artwork.totalItems);

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
      <h2 id="artwork-heading" data-cy="ArtworkHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.home.title">Artworks</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/artwork/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.home.createLabel">Create new Artwork</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {artworkList && artworkList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('artworkTitle')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.artworkTitle">Artwork Title</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('artworkTitle')} />
                </th>
                <th className="hand" onClick={sort('productionYear')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.productionYear">Production Year</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('productionYear')} />
                </th>
                <th className="hand" onClick={sort('seasonNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.seasonNumber">Season Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('seasonNumber')} />
                </th>
                <th className="hand" onClick={sort('episodeOrSequenceNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.episodeOrSequenceNumber">
                    Episode Or Sequence Number
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('episodeOrSequenceNumber')} />
                </th>
                <th className="hand" onClick={sort('registerIdInIMDB')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.registerIdInIMDB">Register Id In IMDB</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('registerIdInIMDB')} />
                </th>
                <th className="hand" onClick={sort('assetsCollectionUUID')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.assetsCollectionUUID">Assets Collection UUID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('assetsCollectionUUID')} />
                </th>
                <th className="hand" onClick={sort('contentDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.contentDetailsJSON">Content Details JSON</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('contentDetailsJSON')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.typeOfArtmedia">Type Of Artmedia</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.artworkAggregator">Artwork Aggregator</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {artworkList.map((artwork, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/artwork/${artwork.id}`} color="link" size="sm">
                      {artwork.id}
                    </Button>
                  </td>
                  <td>{artwork.artworkTitle}</td>
                  <td>{artwork.productionYear}</td>
                  <td>{artwork.seasonNumber}</td>
                  <td>{artwork.episodeOrSequenceNumber}</td>
                  <td>{artwork.registerIdInIMDB}</td>
                  <td>{artwork.assetsCollectionUUID}</td>
                  <td>{artwork.contentDetailsJSON}</td>
                  <td>
                    {artwork.typeOfArtmedia ? (
                      <Link to={`/type-of-artmedia/${artwork.typeOfArtmedia.id}`}>{artwork.typeOfArtmedia.acronym}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {artwork.artworkAggregator ? (
                      <Link to={`/artwork/${artwork.artworkAggregator.id}`}>{artwork.artworkAggregator.artworkTitle}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/artwork/${artwork.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/artwork/${artwork.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/artwork/${artwork.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.home.notFound">No Artworks found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={artworkList && artworkList.length > 0 ? '' : 'd-none'}>
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

export default Artwork;
