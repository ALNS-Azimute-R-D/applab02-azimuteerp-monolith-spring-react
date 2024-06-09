import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './type-of-activity.reducer';

export const TypeOfActivityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const typeOfActivityEntity = useAppSelector(state => state.typeOfActivity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="typeOfActivityDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfActivity.detail.title">TypeOfActivity</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{typeOfActivityEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfActivity.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{typeOfActivityEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfActivity.name">Name</Translate>
            </span>
          </dt>
          <dd>{typeOfActivityEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfActivity.description">Description</Translate>
            </span>
          </dt>
          <dd>{typeOfActivityEntity.description}</dd>
          <dt>
            <span id="handlerClazzName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfActivity.handlerClazzName">Handler Clazz Name</Translate>
            </span>
          </dt>
          <dd>{typeOfActivityEntity.handlerClazzName}</dd>
        </dl>
        <Button tag={Link} to="/type-of-activity" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-of-activity/${typeOfActivityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TypeOfActivityDetail;
