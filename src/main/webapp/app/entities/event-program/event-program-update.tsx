import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEvent } from 'app/shared/model/event.model';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { IProgram } from 'app/shared/model/program.model';
import { getEntities as getPrograms } from 'app/entities/program/program.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { IEventProgram } from 'app/shared/model/event-program.model';
import { getEntity, updateEntity, createEntity, reset } from './event-program.reducer';

export const EventProgramUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const events = useAppSelector(state => state.event.entities);
  const programs = useAppSelector(state => state.program.entities);
  const people = useAppSelector(state => state.person.entities);
  const eventProgramEntity = useAppSelector(state => state.eventProgram.entity);
  const loading = useAppSelector(state => state.eventProgram.loading);
  const updating = useAppSelector(state => state.eventProgram.updating);
  const updateSuccess = useAppSelector(state => state.eventProgram.updateSuccess);

  const handleClose = () => {
    navigate('/event-program' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getEvents({}));
    dispatch(getPrograms({}));
    dispatch(getPeople({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.percentageExecution !== undefined && typeof values.percentageExecution !== 'number') {
      values.percentageExecution = Number(values.percentageExecution);
    }

    const entity = {
      ...eventProgramEntity,
      ...values,
      event: events.find(it => it.id.toString() === values.event?.toString()),
      program: programs.find(it => it.id.toString() === values.program?.toString()),
      responsiblePerson: people.find(it => it.id.toString() === values.responsiblePerson?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...eventProgramEntity,
          event: eventProgramEntity?.event?.id,
          program: eventProgramEntity?.program?.id,
          responsiblePerson: eventProgramEntity?.responsiblePerson?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.eventProgram.home.createOrEditLabel" data-cy="EventProgramCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.eventProgram.home.createOrEditLabel">
              Create or edit a EventProgram
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="event-program-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.eventProgram.percentageExecution')}
                id="event-program-percentageExecution"
                name="percentageExecution"
                data-cy="percentageExecution"
                type="text"
              />
              <ValidatedField
                id="event-program-event"
                name="event"
                data-cy="event"
                label={translate('azimuteErpSpringReactMonolith03App.eventProgram.event')}
                type="select"
              >
                <option value="" key="0" />
                {events
                  ? events.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="event-program-program"
                name="program"
                data-cy="program"
                label={translate('azimuteErpSpringReactMonolith03App.eventProgram.program')}
                type="select"
              >
                <option value="" key="0" />
                {programs
                  ? programs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="event-program-responsiblePerson"
                name="responsiblePerson"
                data-cy="responsiblePerson"
                label={translate('azimuteErpSpringReactMonolith03App.eventProgram.responsiblePerson')}
                type="select"
              >
                <option value="" key="0" />
                {people
                  ? people.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.fullname}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/event-program" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EventProgramUpdate;
