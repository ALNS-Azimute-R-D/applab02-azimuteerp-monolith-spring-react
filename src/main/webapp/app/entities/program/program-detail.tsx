import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './program.reducer';

export const ProgramDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const programEntity = useAppSelector(state => state.program.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="programDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.program.detail.title">Program</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{programEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.program.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{programEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.program.name">Name</Translate>
            </span>
          </dt>
          <dd>{programEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.program.description">Description</Translate>
            </span>
          </dt>
          <dd>{programEntity.description}</dd>
          <dt>
            <span id="fullDescription">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.program.fullDescription">Full Description</Translate>
            </span>
          </dt>
          <dd>{programEntity.fullDescription}</dd>
          <dt>
            <span id="targetPublic">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.program.targetPublic">Target Public</Translate>
            </span>
          </dt>
          <dd>{programEntity.targetPublic}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.program.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{programEntity.activationStatus}</dd>
        </dl>
        <Button tag={Link} to="/program" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/program/${programEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProgramDetail;
