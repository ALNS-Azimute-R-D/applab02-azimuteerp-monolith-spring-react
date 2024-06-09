import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAsset } from 'app/shared/model/asset.model';
import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { IArticle } from 'app/shared/model/article.model';
import { getEntities as getArticles } from 'app/entities/article/article.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { IActivity } from 'app/shared/model/activity.model';
import { getEntities as getActivities } from 'app/entities/activity/activity.reducer';
import { IScheduledActivity } from 'app/shared/model/scheduled-activity.model';
import { getEntities as getScheduledActivities } from 'app/entities/scheduled-activity/scheduled-activity.reducer';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './asset-collection.reducer';

export const AssetCollectionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assets = useAppSelector(state => state.asset.entities);
  const articles = useAppSelector(state => state.article.entities);
  const events = useAppSelector(state => state.event.entities);
  const activities = useAppSelector(state => state.activity.entities);
  const scheduledActivities = useAppSelector(state => state.scheduledActivity.entities);
  const assetCollectionEntity = useAppSelector(state => state.assetCollection.entity);
  const loading = useAppSelector(state => state.assetCollection.loading);
  const updating = useAppSelector(state => state.assetCollection.updating);
  const updateSuccess = useAppSelector(state => state.assetCollection.updateSuccess);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/asset-collection' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAssets({}));
    dispatch(getArticles({}));
    dispatch(getEvents({}));
    dispatch(getActivities({}));
    dispatch(getScheduledActivities({}));
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
      ...assetCollectionEntity,
      ...values,
      assets: mapIdList(values.assets),
      articles: mapIdList(values.articles),
      events: mapIdList(values.events),
      activities: mapIdList(values.activities),
      scheduledActivities: mapIdList(values.scheduledActivities),
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
          activationStatus: 'INACTIVE',
          ...assetCollectionEntity,
          assets: assetCollectionEntity?.assets?.map(e => e.id.toString()),
          articles: assetCollectionEntity?.articles?.map(e => e.id.toString()),
          events: assetCollectionEntity?.events?.map(e => e.id.toString()),
          activities: assetCollectionEntity?.activities?.map(e => e.id.toString()),
          scheduledActivities: assetCollectionEntity?.scheduledActivities?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.assetCollection.home.createOrEditLabel" data-cy="AssetCollectionCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.assetCollection.home.createOrEditLabel">
              Create or edit a AssetCollection
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
                  id="asset-collection-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.assetCollection.name')}
                id="asset-collection-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.assetCollection.fullFilenamePath')}
                id="asset-collection-fullFilenamePath"
                name="fullFilenamePath"
                data-cy="fullFilenamePath"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.assetCollection.activationStatus')}
                id="asset-collection-activationStatus"
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
                label={translate('azimuteErpSpringReactMonolith03App.assetCollection.asset')}
                id="asset-collection-asset"
                data-cy="asset"
                type="select"
                multiple
                name="assets"
              >
                <option value="" key="0" />
                {assets
                  ? assets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.assetCollection.article')}
                id="asset-collection-article"
                data-cy="article"
                type="select"
                multiple
                name="articles"
              >
                <option value="" key="0" />
                {articles
                  ? articles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.assetCollection.event')}
                id="asset-collection-event"
                data-cy="event"
                type="select"
                multiple
                name="events"
              >
                <option value="" key="0" />
                {events
                  ? events.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.assetCollection.activity')}
                id="asset-collection-activity"
                data-cy="activity"
                type="select"
                multiple
                name="activities"
              >
                <option value="" key="0" />
                {activities
                  ? activities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.assetCollection.scheduledActivity')}
                id="asset-collection-scheduledActivity"
                data-cy="scheduledActivity"
                type="select"
                multiple
                name="scheduledActivities"
              >
                <option value="" key="0" />
                {scheduledActivities
                  ? scheduledActivities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset-collection" replace color="info">
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

export default AssetCollectionUpdate;
