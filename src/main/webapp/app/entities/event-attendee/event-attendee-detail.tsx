import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './event-attendee.reducer';

export const EventAttendeeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const eventAttendeeEntity = useAppSelector(state => state.eventAttendee.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventAttendeeDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.detail.title">EventAttendee</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{eventAttendeeEntity.id}</dd>
          <dt>
            <span id="attendedAsRole">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.attendedAsRole">Attended As Role</Translate>
            </span>
          </dt>
          <dd>{eventAttendeeEntity.attendedAsRole}</dd>
          <dt>
            <span id="wasPresentInEvent">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.wasPresentInEvent">Was Present In Event</Translate>
            </span>
          </dt>
          <dd>{eventAttendeeEntity.wasPresentInEvent ? 'true' : 'false'}</dd>
          <dt>
            <span id="shouldBuyTicket">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.shouldBuyTicket">Should Buy Ticket</Translate>
            </span>
          </dt>
          <dd>{eventAttendeeEntity.shouldBuyTicket ? 'true' : 'false'}</dd>
          <dt>
            <span id="ticketNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.ticketNumber">Ticket Number</Translate>
            </span>
          </dt>
          <dd>{eventAttendeeEntity.ticketNumber}</dd>
          <dt>
            <span id="seatNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.seatNumber">Seat Number</Translate>
            </span>
          </dt>
          <dd>{eventAttendeeEntity.seatNumber}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.attendeePerson">Attendee Person</Translate>
          </dt>
          <dd>{eventAttendeeEntity.attendeePerson ? eventAttendeeEntity.attendeePerson.fullname : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.event">Event</Translate>
          </dt>
          <dd>{eventAttendeeEntity.event ? eventAttendeeEntity.event.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.eventAttendee.ticketPurchased">Ticket Purchased</Translate>
          </dt>
          <dd>{eventAttendeeEntity.ticketPurchased ? eventAttendeeEntity.ticketPurchased.buyingCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/event-attendee" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event-attendee/${eventAttendeeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventAttendeeDetail;
