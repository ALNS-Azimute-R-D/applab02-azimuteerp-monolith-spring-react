import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './artist.reducer';

export const Artist = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const artistList = useAppSelector(state => state.artist.entities);
  const loading = useAppSelector(state => state.artist.loading);
  const totalItems = useAppSelector(state => state.artist.totalItems);

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
      <h2 id="artist-heading" data-cy="ArtistHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.home.title">Artists</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/artist/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.home.createLabel">Create new Artist</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {artistList && artistList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('acronym')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.acronym">Acronym</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('acronym')} />
                </th>
                <th className="hand" onClick={sort('publicName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.publicName">Public Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('publicName')} />
                </th>
                <th className="hand" onClick={sort('realName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.realName">Real Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('realName')} />
                </th>
                <th className="hand" onClick={sort('biographyDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.biographyDetailsJSON">Biography Details JSON</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('biographyDetailsJSON')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.typeOfArtmedia">Type Of Artmedia</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.typeOfArtist">Type Of Artist</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.artistAggregator">Artist Aggregator</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {artistList.map((artist, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/artist/${artist.id}`} color="link" size="sm">
                      {artist.id}
                    </Button>
                  </td>
                  <td>{artist.acronym}</td>
                  <td>{artist.publicName}</td>
                  <td>{artist.realName}</td>
                  <td>{artist.biographyDetailsJSON}</td>
                  <td>
                    {artist.typeOfArtmedia ? (
                      <Link to={`/type-of-artmedia/${artist.typeOfArtmedia.id}`}>{artist.typeOfArtmedia.acronym}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {artist.typeOfArtist ? <Link to={`/type-of-artist/${artist.typeOfArtist.id}`}>{artist.typeOfArtist.acronym}</Link> : ''}
                  </td>
                  <td>
                    {artist.artistAggregator ? (
                      <Link to={`/artist/${artist.artistAggregator.id}`}>{artist.artistAggregator.acronym}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/artist/${artist.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/artist/${artist.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/artist/${artist.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.home.notFound">No Artists found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={artistList && artistList.length > 0 ? '' : 'd-none'}>
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

export default Artist;
