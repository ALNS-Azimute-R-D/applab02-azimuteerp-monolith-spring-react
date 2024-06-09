import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './type-of-event.reducer';

export const TypeOfEventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const typeOfEventEntity = useAppSelector(state => state.typeOfEvent.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="typeOfEventDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfEvent.detail.title">TypeOfEvent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{typeOfEventEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfEvent.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{typeOfEventEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfEvent.name">Name</Translate>
            </span>
          </dt>
          <dd>{typeOfEventEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfEvent.description">Description</Translate>
            </span>
          </dt>
          <dd>{typeOfEventEntity.description}</dd>
          <dt>
            <span id="handlerClazzName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfEvent.handlerClazzName">Handler Clazz Name</Translate>
            </span>
          </dt>
          <dd>{typeOfEventEntity.handlerClazzName}</dd>
        </dl>
        <Button tag={Link} to="/type-of-event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-of-event/${typeOfEventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TypeOfEventDetail;
