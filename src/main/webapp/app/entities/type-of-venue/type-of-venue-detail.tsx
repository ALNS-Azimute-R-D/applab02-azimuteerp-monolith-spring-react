import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './type-of-venue.reducer';

export const TypeOfVenueDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const typeOfVenueEntity = useAppSelector(state => state.typeOfVenue.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="typeOfVenueDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfVenue.detail.title">TypeOfVenue</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{typeOfVenueEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfVenue.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{typeOfVenueEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfVenue.name">Name</Translate>
            </span>
          </dt>
          <dd>{typeOfVenueEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfVenue.description">Description</Translate>
            </span>
          </dt>
          <dd>{typeOfVenueEntity.description}</dd>
          <dt>
            <span id="handlerClazzName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfVenue.handlerClazzName">Handler Clazz Name</Translate>
            </span>
          </dt>
          <dd>{typeOfVenueEntity.handlerClazzName}</dd>
        </dl>
        <Button tag={Link} to="/type-of-venue" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-of-venue/${typeOfVenueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TypeOfVenueDetail;
