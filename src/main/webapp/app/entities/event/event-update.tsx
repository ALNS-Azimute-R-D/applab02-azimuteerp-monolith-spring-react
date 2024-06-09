import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IVenue } from 'app/shared/model/venue.model';
import { getEntities as getVenues } from 'app/entities/venue/venue.reducer';
import { ITypeOfEvent } from 'app/shared/model/type-of-event.model';
import { getEntities as getTypeOfEvents } from 'app/entities/type-of-event/type-of-event.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { getEntities as getAssetCollections } from 'app/entities/asset-collection/asset-collection.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { EventStatusEnum } from 'app/shared/model/enumerations/event-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './event.reducer';

export const EventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const venues = useAppSelector(state => state.venue.entities);
  const typeOfEvents = useAppSelector(state => state.typeOfEvent.entities);
  const people = useAppSelector(state => state.person.entities);
  const assetCollections = useAppSelector(state => state.assetCollection.entities);
  const eventEntity = useAppSelector(state => state.event.entity);
  const loading = useAppSelector(state => state.event.loading);
  const updating = useAppSelector(state => state.event.updating);
  const updateSuccess = useAppSelector(state => state.event.updateSuccess);
  const eventStatusEnumValues = Object.keys(EventStatusEnum);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/event' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getVenues({}));
    dispatch(getTypeOfEvents({}));
    dispatch(getPeople({}));
    dispatch(getAssetCollections({}));
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
    values.startTime = convertDateTimeToServer(values.startTime);
    values.endTime = convertDateTimeToServer(values.endTime);
    if (values.defaultTicketValue !== undefined && typeof values.defaultTicketValue !== 'number') {
      values.defaultTicketValue = Number(values.defaultTicketValue);
    }

    const entity = {
      ...eventEntity,
      ...values,
      mainVenue: venues.find(it => it.id.toString() === values.mainVenue?.toString()),
      typeOfEvent: typeOfEvents.find(it => it.id.toString() === values.typeOfEvent?.toString()),
      promoteurPerson: people.find(it => it.id.toString() === values.promoteurPerson?.toString()),
      assetCollections: mapIdList(values.assetCollections),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          startTime: displayDefaultDateTime(),
          endTime: displayDefaultDateTime(),
        }
      : {
          status: 'IN_PREVIEM',
          activationStatus: 'INACTIVE',
          ...eventEntity,
          startTime: convertDateTimeFromServer(eventEntity.startTime),
          endTime: convertDateTimeFromServer(eventEntity.endTime),
          mainVenue: eventEntity?.mainVenue?.id,
          typeOfEvent: eventEntity?.typeOfEvent?.id,
          promoteurPerson: eventEntity?.promoteurPerson?.id,
          assetCollections: eventEntity?.assetCollections?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.event.home.createOrEditLabel" data-cy="EventCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.event.home.createOrEditLabel">Create or edit a Event</Translate>
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
                  id="event-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.acronym')}
                id="event-acronym"
                name="acronym"
                data-cy="acronym"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.name')}
                id="event-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 150, message: translate('entity.validation.maxlength', { max: 150 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.description')}
                id="event-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.fullDescription')}
                id="event-fullDescription"
                name="fullDescription"
                data-cy="fullDescription"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.startTime')}
                id="event-startTime"
                name="startTime"
                data-cy="startTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.endTime')}
                id="event-endTime"
                name="endTime"
                data-cy="endTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.defaultTicketValue')}
                id="event-defaultTicketValue"
                name="defaultTicketValue"
                data-cy="defaultTicketValue"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.status')}
                id="event-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {eventStatusEnumValues.map(eventStatusEnum => (
                  <option value={eventStatusEnum} key={eventStatusEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.EventStatusEnum.' + eventStatusEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.event.activationStatus')}
                id="event-activationStatus"
                name="activationStatus"
                data-cy="activationStatus"
                type="select"
              >
                {activationStatusEnumValues.map(activationStatusEnum => (
                  <option value={activationStatusEnum} key={activationStatusEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.ActivationStatusEnum.' + activationStatusEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="event-mainVenue"
                name="mainVenue"
                data-cy="mainVenue"
                label={translate('azimuteErpSpringReactMonolith03App.event.mainVenue')}
                type="select"
              >
                <option value="" key="0" />
                {venues
                  ? venues.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="event-typeOfEvent"
                name="typeOfEvent"
                data-cy="typeOfEvent"
                label={translate('azimuteErpSpringReactMonolith03App.event.typeOfEvent')}
                type="select"
                required
              >
                <option value="" key="0" />
                {typeOfEvents
                  ? typeOfEvents.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="event-promoteurPerson"
                name="promoteurPerson"
                data-cy="promoteurPerson"
                label={translate('azimuteErpSpringReactMonolith03App.event.promoteurPerson')}
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
                label={translate('azimuteErpSpringReactMonolith03App.event.assetCollection')}
                id="event-assetCollection"
                data-cy="assetCollection"
                type="select"
                multiple
                name="assetCollections"
              >
                <option value="" key="0" />
                {assetCollections
                  ? assetCollections.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/event" replace color="info">
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

export default EventUpdate;
