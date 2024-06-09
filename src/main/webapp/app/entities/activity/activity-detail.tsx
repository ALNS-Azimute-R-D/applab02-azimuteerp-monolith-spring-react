import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { DurationFormat } from 'app/shared/DurationFormat';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './activity.reducer';

export const ActivityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const activityEntity = useAppSelector(state => state.activity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="activityDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.detail.title">Activity</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{activityEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.name">Name</Translate>
            </span>
          </dt>
          <dd>{activityEntity.name}</dd>
          <dt>
            <span id="shortDescription">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.shortDescription">Short Description</Translate>
            </span>
          </dt>
          <dd>{activityEntity.shortDescription}</dd>
          <dt>
            <span id="fullDescription">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.fullDescription">Full Description</Translate>
            </span>
          </dt>
          <dd>{activityEntity.fullDescription}</dd>
          <dt>
            <span id="mainGoals">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.mainGoals">Main Goals</Translate>
            </span>
          </dt>
          <dd>{activityEntity.mainGoals}</dd>
          <dt>
            <span id="estimatedDurationTime">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.estimatedDurationTime">Estimated Duration Time</Translate>
            </span>
          </dt>
          <dd>
            {activityEntity.estimatedDurationTime ? <DurationFormat value={activityEntity.estimatedDurationTime} /> : null} (
            {activityEntity.estimatedDurationTime})
          </dd>
          <dt>
            <span id="lastPerformedDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.lastPerformedDate">Last Performed Date</Translate>
            </span>
          </dt>
          <dd>
            {activityEntity.lastPerformedDate ? (
              <TextFormat value={activityEntity.lastPerformedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{activityEntity.createdAt ? <TextFormat value={activityEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{activityEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.typeOfActivity">Type Of Activity</Translate>
          </dt>
          <dd>{activityEntity.typeOfActivity ? activityEntity.typeOfActivity.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.createdByUser">Created By User</Translate>
          </dt>
          <dd>{activityEntity.createdByUser ? activityEntity.createdByUser.fullname : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.activity.assetCollection">Asset Collection</Translate>
          </dt>
          <dd>
            {activityEntity.assetCollections
              ? activityEntity.assetCollections.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {activityEntity.assetCollections && i === activityEntity.assetCollections.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/activity" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/activity/${activityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ActivityDetail;
