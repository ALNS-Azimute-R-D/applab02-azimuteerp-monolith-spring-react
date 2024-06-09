import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './artistic-genre.reducer';

export const ArtisticGenreDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const artisticGenreEntity = useAppSelector(state => state.artisticGenre.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="artisticGenreDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.artisticGenre.detail.title">ArtisticGenre</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{artisticGenreEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artisticGenre.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{artisticGenreEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artisticGenre.name">Name</Translate>
            </span>
          </dt>
          <dd>{artisticGenreEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artisticGenre.description">Description</Translate>
            </span>
          </dt>
          <dd>{artisticGenreEntity.description}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artisticGenre.artisticGenre">Artistic Genre</Translate>
          </dt>
          <dd>
            {artisticGenreEntity.artisticGenres
              ? artisticGenreEntity.artisticGenres.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {artisticGenreEntity.artisticGenres && i === artisticGenreEntity.artisticGenres.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/artistic-genre" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/artistic-genre/${artisticGenreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ArtisticGenreDetail;
