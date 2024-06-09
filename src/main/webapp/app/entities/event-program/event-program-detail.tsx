import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './event-program.reducer';

export const EventProgramDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const eventProgramEntity = useAppSelector(state => state.eventProgram.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventProgramDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.eventProgram.detail.title">EventProgram</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{eventProgramEntity.id}</dd>
          <dt>
            <span id="percentageExecution">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.eventProgram.percentageExecution">Percentage Execution</Translate>
            </span>
          </dt>
          <dd>{eventProgramEntity.percentageExecution}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.eventProgram.event">Event</Translate>
          </dt>
          <dd>{eventProgramEntity.event ? eventProgramEntity.event.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.eventProgram.program">Program</Translate>
          </dt>
          <dd>{eventProgramEntity.program ? eventProgramEntity.program.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.eventProgram.responsiblePerson">Responsible Person</Translate>
          </dt>
          <dd>{eventProgramEntity.responsiblePerson ? eventProgramEntity.responsiblePerson.fullname : ''}</dd>
        </dl>
        <Button tag={Link} to="/event-program" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event-program/${eventProgramEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventProgramDetail;
