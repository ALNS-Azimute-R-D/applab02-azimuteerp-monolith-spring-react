import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './scheduled-activity.reducer';

export const ScheduledActivityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const scheduledActivityEntity = useAppSelector(state => state.scheduledActivity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="scheduledActivityDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.detail.title">ScheduledActivity</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{scheduledActivityEntity.id}</dd>
          <dt>
            <span id="customizedName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.customizedName">Customized Name</Translate>
            </span>
          </dt>
          <dd>{scheduledActivityEntity.customizedName}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>
            {scheduledActivityEntity.startTime ? (
              <TextFormat value={scheduledActivityEntity.startTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endTime">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.endTime">End Time</Translate>
            </span>
          </dt>
          <dd>
            {scheduledActivityEntity.endTime ? (
              <TextFormat value={scheduledActivityEntity.endTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="numberOfAttendees">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.numberOfAttendees">Number Of Attendees</Translate>
            </span>
          </dt>
          <dd>{scheduledActivityEntity.numberOfAttendees}</dd>
          <dt>
            <span id="averageEvaluationInStars">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.averageEvaluationInStars">
                Average Evaluation In Stars
              </Translate>
            </span>
          </dt>
          <dd>{scheduledActivityEntity.averageEvaluationInStars}</dd>
          <dt>
            <span id="customAttributtesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.customAttributtesDetailsJSON">
                Custom Attributtes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{scheduledActivityEntity.customAttributtesDetailsJSON}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{scheduledActivityEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.program">Program</Translate>
          </dt>
          <dd>{scheduledActivityEntity.program ? scheduledActivityEntity.program.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.activity">Activity</Translate>
          </dt>
          <dd>{scheduledActivityEntity.activity ? scheduledActivityEntity.activity.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.responsiblePerson">Responsible Person</Translate>
          </dt>
          <dd>{scheduledActivityEntity.responsiblePerson ? scheduledActivityEntity.responsiblePerson.fullname : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.scheduledActivity.assetCollection">Asset Collection</Translate>
          </dt>
          <dd>
            {scheduledActivityEntity.assetCollections
              ? scheduledActivityEntity.assetCollections.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {scheduledActivityEntity.assetCollections && i === scheduledActivityEntity.assetCollections.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/scheduled-activity" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/scheduled-activity/${scheduledActivityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ScheduledActivityDetail;
