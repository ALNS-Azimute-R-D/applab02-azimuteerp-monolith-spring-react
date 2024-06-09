import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './type-of-artist.reducer';

export const TypeOfArtistDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const typeOfArtistEntity = useAppSelector(state => state.typeOfArtist.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="typeOfArtistDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfArtist.detail.title">TypeOfArtist</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{typeOfArtistEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfArtist.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{typeOfArtistEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfArtist.name">Name</Translate>
            </span>
          </dt>
          <dd>{typeOfArtistEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfArtist.description">Description</Translate>
            </span>
          </dt>
          <dd>{typeOfArtistEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/type-of-artist" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-of-artist/${typeOfArtistEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TypeOfArtistDetail;
