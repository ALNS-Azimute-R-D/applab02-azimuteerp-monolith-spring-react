import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITypeOfActivity } from 'app/shared/model/type-of-activity.model';
import { getEntities as getTypeOfActivities } from 'app/entities/type-of-activity/type-of-activity.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { getEntities as getAssetCollections } from 'app/entities/asset-collection/asset-collection.reducer';
import { IActivity } from 'app/shared/model/activity.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './activity.reducer';

export const ActivityUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const typeOfActivities = useAppSelector(state => state.typeOfActivity.entities);
  const people = useAppSelector(state => state.person.entities);
  const assetCollections = useAppSelector(state => state.assetCollection.entities);
  const activityEntity = useAppSelector(state => state.activity.entity);
  const loading = useAppSelector(state => state.activity.loading);
  const updating = useAppSelector(state => state.activity.updating);
  const updateSuccess = useAppSelector(state => state.activity.updateSuccess);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/activity' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTypeOfActivities({}));
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
    values.createdAt = convertDateTimeToServer(values.createdAt);

    const entity = {
      ...activityEntity,
      ...values,
      typeOfActivity: typeOfActivities.find(it => it.id.toString() === values.typeOfActivity?.toString()),
      createdByUser: people.find(it => it.id.toString() === values.createdByUser?.toString()),
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
          createdAt: displayDefaultDateTime(),
        }
      : {
          activationStatus: 'INACTIVE',
          ...activityEntity,
          createdAt: convertDateTimeFromServer(activityEntity.createdAt),
          typeOfActivity: activityEntity?.typeOfActivity?.id,
          createdByUser: activityEntity?.createdByUser?.id,
          assetCollections: activityEntity?.assetCollections?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.activity.home.createOrEditLabel" data-cy="ActivityCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.home.createOrEditLabel">Create or edit a Activity</Translate>
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
                  id="activity-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.activity.name')}
                id="activity-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.activity.shortDescription')}
                id="activity-shortDescription"
                name="shortDescription"
                data-cy="shortDescription"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.activity.fullDescription')}
                id="activity-fullDescription"
                name="fullDescription"
                data-cy="fullDescription"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.activity.mainGoals')}
                id="activity-mainGoals"
                name="mainGoals"
                data-cy="mainGoals"
                type="text"
                validate={{
                  maxLength: { value: 1024, message: translate('entity.validation.maxlength', { max: 1024 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.activity.estimatedDurationTime')}
                id="activity-estimatedDurationTime"
                name="estimatedDurationTime"
                data-cy="estimatedDurationTime"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.activity.lastPerformedDate')}
                id="activity-lastPerformedDate"
                name="lastPerformedDate"
                data-cy="lastPerformedDate"
                type="date"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.activity.createdAt')}
                id="activity-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.activity.activationStatus')}
                id="activity-activationStatus"
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
                id="activity-typeOfActivity"
                name="typeOfActivity"
                data-cy="typeOfActivity"
                label={translate('azimuteErpSpringReactMonolith03App.activity.typeOfActivity')}
                type="select"
                required
              >
                <option value="" key="0" />
                {typeOfActivities
                  ? typeOfActivities.map(otherEntity => (
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
                id="activity-createdByUser"
                name="createdByUser"
                data-cy="createdByUser"
                label={translate('azimuteErpSpringReactMonolith03App.activity.createdByUser')}
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
                label={translate('azimuteErpSpringReactMonolith03App.activity.assetCollection')}
                id="activity-assetCollection"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/activity" replace color="info">
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

export default ActivityUpdate;
