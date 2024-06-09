import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './artwork-cast.reducer';

export const ArtworkCast = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const artworkCastList = useAppSelector(state => state.artworkCast.entities);
  const loading = useAppSelector(state => state.artworkCast.loading);
  const totalItems = useAppSelector(state => state.artworkCast.totalItems);

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
      <h2 id="artwork-cast-heading" data-cy="ArtworkCastHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.home.title">Artwork Casts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/artwork-cast/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.home.createLabel">Create new Artwork Cast</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {artworkCastList && artworkCastList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('orderOfAppearance')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.orderOfAppearance">Order Of Appearance</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('orderOfAppearance')} />
                </th>
                <th className="hand" onClick={sort('characterName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.characterName">Character Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('characterName')} />
                </th>
                <th className="hand" onClick={sort('mainAssetUUID')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.mainAssetUUID">Main Asset UUID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mainAssetUUID')} />
                </th>
                <th className="hand" onClick={sort('characterDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.characterDetailsJSON">
                    Character Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('characterDetailsJSON')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.artwork">Artwork</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.artist">Artist</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {artworkCastList.map((artworkCast, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/artwork-cast/${artworkCast.id}`} color="link" size="sm">
                      {artworkCast.id}
                    </Button>
                  </td>
                  <td>{artworkCast.orderOfAppearance}</td>
                  <td>{artworkCast.characterName}</td>
                  <td>{artworkCast.mainAssetUUID}</td>
                  <td>{artworkCast.characterDetailsJSON}</td>
                  <td>
                    {artworkCast.artwork ? <Link to={`/artwork/${artworkCast.artwork.id}`}>{artworkCast.artwork.artworkTitle}</Link> : ''}
                  </td>
                  <td>{artworkCast.artist ? <Link to={`/artist/${artworkCast.artist.id}`}>{artworkCast.artist.publicName}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/artwork-cast/${artworkCast.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/artwork-cast/${artworkCast.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/artwork-cast/${artworkCast.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.home.notFound">No Artwork Casts found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={artworkCastList && artworkCastList.length > 0 ? '' : 'd-none'}>
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

export default ArtworkCast;
