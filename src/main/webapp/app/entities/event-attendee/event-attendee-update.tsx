import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { ITicketPurchased } from 'app/shared/model/ticket-purchased.model';
import { getEntities as getTicketPurchaseds } from 'app/entities/ticket-purchased/ticket-purchased.reducer';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';
import { getEntity, updateEntity, createEntity, reset } from './event-attendee.reducer';

export const EventAttendeeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const people = useAppSelector(state => state.person.entities);
  const events = useAppSelector(state => state.event.entities);
  const ticketPurchaseds = useAppSelector(state => state.ticketPurchased.entities);
  const eventAttendeeEntity = useAppSelector(state => state.eventAttendee.entity);
  const loading = useAppSelector(state => state.eventAttendee.loading);
  const updating = useAppSelector(state => state.eventAttendee.updating);
  const updateSuccess = useAppSelector(state => state.eventAttendee.updateSuccess);

  const handleClose = () => {
    navigate('/event-attendee' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPeople({}));
    dispatch(getEvents({}));
    dispatch(getTicketPurchaseds({}));
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

    const entity = {
      ...eventAttendeeEntity,
      ...values,
      attendeePerson: people.find(it => it.id.toString() === values.attendeePerson?.toString()),
      event: events.find(it => it.id.toString() === values.event?.toString()),
      ticketPurchased: ticketPurchaseds.find(it => it.id.toString() === values.ticketPurchased?.toString()),
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
          ...eventAttendeeEntity,
          attendeePerson: eventAttendeeEntity?.attendeePerson?.id,
          event: eventAttendeeEntity?.event?.id,
          ticketPurchased: eventAttendeeEntity?.ticketPurchased?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.eventAttendee.home.createOrEditLabel" data-cy="EventAttendeeCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.home.createOrEditLabel">
              Create or edit a EventAttendee
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
                  id="event-attendee-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.eventAttendee.attendedAsRole')}
                id="event-attendee-attendedAsRole"
                name="attendedAsRole"
                data-cy="attendedAsRole"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.eventAttendee.wasPresentInEvent')}
                id="event-attendee-wasPresentInEvent"
                name="wasPresentInEvent"
                data-cy="wasPresentInEvent"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.eventAttendee.shouldBuyTicket')}
                id="event-attendee-shouldBuyTicket"
                name="shouldBuyTicket"
                data-cy="shouldBuyTicket"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.eventAttendee.ticketNumber')}
                id="event-attendee-ticketNumber"
                name="ticketNumber"
                data-cy="ticketNumber"
                type="text"
                validate={{
                  maxLength: { value: 20, message: translate('entity.validation.maxlength', { max: 20 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.eventAttendee.seatNumber')}
                id="event-attendee-seatNumber"
                name="seatNumber"
                data-cy="seatNumber"
                type="text"
                validate={{
                  maxLength: { value: 10, message: translate('entity.validation.maxlength', { max: 10 }) },
                }}
              />
              <ValidatedField
                id="event-attendee-attendeePerson"
                name="attendeePerson"
                data-cy="attendeePerson"
                label={translate('azimuteErpSpringReactMonolith03App.eventAttendee.attendeePerson')}
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
              <ValidatedField
                id="event-attendee-event"
                name="event"
                data-cy="event"
                label={translate('azimuteErpSpringReactMonolith03App.eventAttendee.event')}
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
                id="event-attendee-ticketPurchased"
                name="ticketPurchased"
                data-cy="ticketPurchased"
                label={translate('azimuteErpSpringReactMonolith03App.eventAttendee.ticketPurchased')}
                type="select"
              >
                <option value="" key="0" />
                {ticketPurchaseds
                  ? ticketPurchaseds.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.buyingCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/event-attendee" replace color="info">
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

export default EventAttendeeUpdate;
