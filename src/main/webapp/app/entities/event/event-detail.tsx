import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './event.reducer';

export const EventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const eventEntity = useAppSelector(state => state.event.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.event.detail.title">Event</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{eventEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{eventEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.name">Name</Translate>
            </span>
          </dt>
          <dd>{eventEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.description">Description</Translate>
            </span>
          </dt>
          <dd>{eventEntity.description}</dd>
          <dt>
            <span id="fullDescription">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.fullDescription">Full Description</Translate>
            </span>
          </dt>
          <dd>{eventEntity.fullDescription}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>{eventEntity.startTime ? <TextFormat value={eventEntity.startTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endTime">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.endTime">End Time</Translate>
            </span>
          </dt>
          <dd>{eventEntity.endTime ? <TextFormat value={eventEntity.endTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="defaultTicketValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.defaultTicketValue">Default Ticket Value</Translate>
            </span>
          </dt>
          <dd>{eventEntity.defaultTicketValue}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.status">Status</Translate>
            </span>
          </dt>
          <dd>{eventEntity.status}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.event.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{eventEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.event.mainVenue">Main Venue</Translate>
          </dt>
          <dd>{eventEntity.mainVenue ? eventEntity.mainVenue.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.event.typeOfEvent">Type Of Event</Translate>
          </dt>
          <dd>{eventEntity.typeOfEvent ? eventEntity.typeOfEvent.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.event.promoteurPerson">Promoteur Person</Translate>
          </dt>
          <dd>{eventEntity.promoteurPerson ? eventEntity.promoteurPerson.fullname : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.event.assetCollection">Asset Collection</Translate>
          </dt>
          <dd>
            {eventEntity.assetCollections
              ? eventEntity.assetCollections.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {eventEntity.assetCollections && i === eventEntity.assetCollections.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event/${eventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventDetail;
