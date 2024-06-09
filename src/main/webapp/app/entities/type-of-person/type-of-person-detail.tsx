import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './type-of-person.reducer';

export const TypeOfPersonDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const typeOfPersonEntity = useAppSelector(state => state.typeOfPerson.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="typeOfPersonDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfPerson.detail.title">TypeOfPerson</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{typeOfPersonEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfPerson.code">Code</Translate>
            </span>
          </dt>
          <dd>{typeOfPersonEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfPerson.description">Description</Translate>
            </span>
          </dt>
          <dd>{typeOfPersonEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/type-of-person" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-of-person/${typeOfPersonEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TypeOfPersonDetail;
