import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProgram } from 'app/shared/model/program.model';
import { getEntities as getPrograms } from 'app/entities/program/program.reducer';
import { IActivity } from 'app/shared/model/activity.model';
import { getEntities as getActivities } from 'app/entities/activity/activity.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { getEntities as getAssetCollections } from 'app/entities/asset-collection/asset-collection.reducer';
import { IScheduledActivity } from 'app/shared/model/scheduled-activity.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './scheduled-activity.reducer';

export const ScheduledActivityUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const programs = useAppSelector(state => state.program.entities);
  const activities = useAppSelector(state => state.activity.entities);
  const people = useAppSelector(state => state.person.entities);
  const assetCollections = useAppSelector(state => state.assetCollection.entities);
  const scheduledActivityEntity = useAppSelector(state => state.scheduledActivity.entity);
  const loading = useAppSelector(state => state.scheduledActivity.loading);
  const updating = useAppSelector(state => state.scheduledActivity.updating);
  const updateSuccess = useAppSelector(state => state.scheduledActivity.updateSuccess);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/scheduled-activity' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPrograms({}));
    dispatch(getActivities({}));
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
    if (values.numberOfAttendees !== undefined && typeof values.numberOfAttendees !== 'number') {
      values.numberOfAttendees = Number(values.numberOfAttendees);
    }
    if (values.averageEvaluationInStars !== undefined && typeof values.averageEvaluationInStars !== 'number') {
      values.averageEvaluationInStars = Number(values.averageEvaluationInStars);
    }

    const entity = {
      ...scheduledActivityEntity,
      ...values,
      program: programs.find(it => it.id.toString() === values.program?.toString()),
      activity: activities.find(it => it.id.toString() === values.activity?.toString()),
      responsiblePerson: people.find(it => it.id.toString() === values.responsiblePerson?.toString()),
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
          activationStatus: 'INACTIVE',
          ...scheduledActivityEntity,
          startTime: convertDateTimeFromServer(scheduledActivityEntity.startTime),
          endTime: convertDateTimeFromServer(scheduledActivityEntity.endTime),
          program: scheduledActivityEntity?.program?.id,
          activity: scheduledActivityEntity?.activity?.id,
          responsiblePerson: scheduledActivityEntity?.responsiblePerson?.id,
          assetCollections: scheduledActivityEntity?.assetCollections?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="azimuteErpSpringReactMonolith03App.scheduledActivity.home.createOrEditLabel"
            data-cy="ScheduledActivityCreateUpdateHeading"
          >
            <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.home.createOrEditLabel">
              Create or edit a ScheduledActivity
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
                  id="scheduled-activity-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.customizedName')}
                id="scheduled-activity-customizedName"
                name="customizedName"
                data-cy="customizedName"
                type="text"
                validate={{
                  maxLength: { value: 150, message: translate('entity.validation.maxlength', { max: 150 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.startTime')}
                id="scheduled-activity-startTime"
                name="startTime"
                data-cy="startTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.endTime')}
                id="scheduled-activity-endTime"
                name="endTime"
                data-cy="endTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.numberOfAttendees')}
                id="scheduled-activity-numberOfAttendees"
                name="numberOfAttendees"
                data-cy="numberOfAttendees"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.averageEvaluationInStars')}
                id="scheduled-activity-averageEvaluationInStars"
                name="averageEvaluationInStars"
                data-cy="averageEvaluationInStars"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.customAttributtesDetailsJSON')}
                id="scheduled-activity-customAttributtesDetailsJSON"
                name="customAttributtesDetailsJSON"
                data-cy="customAttributtesDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 4096, message: translate('entity.validation.maxlength', { max: 4096 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.activationStatus')}
                id="scheduled-activity-activationStatus"
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
                id="scheduled-activity-program"
                name="program"
                data-cy="program"
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.program')}
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
                id="scheduled-activity-activity"
                name="activity"
                data-cy="activity"
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.activity')}
                type="select"
              >
                <option value="" key="0" />
                {activities
                  ? activities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="scheduled-activity-responsiblePerson"
                name="responsiblePerson"
                data-cy="responsiblePerson"
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.responsiblePerson')}
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
                label={translate('azimuteErpSpringReactMonolith03App.scheduledActivity.assetCollection')}
                id="scheduled-activity-assetCollection"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/scheduled-activity" replace color="info">
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

export default ScheduledActivityUpdate;
