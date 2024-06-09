import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './type-of-artmedia.reducer';

export const TypeOfArtmediaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const typeOfArtmediaEntity = useAppSelector(state => state.typeOfArtmedia.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="typeOfArtmediaDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfArtmedia.detail.title">TypeOfArtmedia</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{typeOfArtmediaEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfArtmedia.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{typeOfArtmediaEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfArtmedia.name">Name</Translate>
            </span>
          </dt>
          <dd>{typeOfArtmediaEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfArtmedia.description">Description</Translate>
            </span>
          </dt>
          <dd>{typeOfArtmediaEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/type-of-artmedia" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-of-artmedia/${typeOfArtmediaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TypeOfArtmediaDetail;
